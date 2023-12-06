import "dotenv/config";
import fs from "fs";
import crypto from "crypto";
import forge from "node-forge";
import { DeveloperAccountApi } from "../../generated/apis/developer-account-api";

// Read in the .env file and check if there is an Entity Secret
async function entitySecretCheck() {
  if (typeof process.env.ENTITY_SECRET === "string") {
    return process.env.ENTITY_SECRET;
  } else if (process.env.ENTITY_SECRET === undefined) {
    process.env.ENTITY_SECRET = crypto.randomBytes(32).toString("hex");
    try { 
      await fs.promises.appendFile(".env", `\nENTITY_SECRET="${process.env.ENTITY_SECRET}"`);
      return process.env.ENTITY_SECRET;
    } catch (error) {
      console.error(error);
    }
  } 
}

const developerAccountApi = new DeveloperAccountApi({
  accessToken: process.env.API_KEY,
  isJsonMime: (mime) => mime.includes("json"),
});
async function getPublicKey() {
  try {
    const response = await developerAccountApi.getPublicKey();
    return response.data.data?.publicKey;
  } catch (error) {
    console.error(error);
  }
}

export async function createEntitySecretCiphertext() {
  const secret = await entitySecretCheck();
  const apiPublicKey = await getPublicKey();
  if (typeof apiPublicKey === "string") {
    // @ts-ignore
    const entitySecret = forge.util.hexToBytes(secret);
    const publicKey = forge.pki.publicKeyFromPem(apiPublicKey);
    const encryptedData = publicKey.encrypt(entitySecret, "RSA-OAEP", {
      md: forge.md.sha256.create(),
      mgf1: {
        md: forge.md.sha256.create(),
      },
    });
    return forge.util.encode64(encryptedData);
  }
}
