import "dotenv/config";
import { Router } from "express";
import { createEntitySecretCiphertext } from "../../client/custom/apis/createEntitySecretCiphertext.js";

const router = Router();

router.post("/createEntitySecretCiphertext", async (req, res) => {
  try {
    const entitySecretCipherText = await createEntitySecretCiphertext();
    const createEntitySecretCiphertextResponse = {
      data: {
        registerAt: "https://console.circle.com/wallets/dev/configurator",
        entitySecretCipherText: entitySecretCipherText,
      },
    };
    res.status(201).send(createEntitySecretCiphertextResponse);
  } catch (error) {
    res
    .status(error.response.status)
    .header(error.response.header)
    .send(error.response.data);
  }
});

export default router;
