import "dotenv/config";
import { Router, Request, Response } from "express";
import { CreateEntitySecretCiphertext } from "../../client/custom/apis/createEntitySecretCiphertext";
import { CreateEntitySecretCiphertextResponse } from "../models/createEntitySecretCiphertextResponse";

const router = Router();

router.post("/createEntitySecretCiphertext", async (req: Request, res: Response) => {
  try {
    const entitySecretCipherText = await CreateEntitySecretCiphertext();
    const createEntitySecretCiphertextResponse: CreateEntitySecretCiphertextResponse = {
      data: {
        registerAt: "https://console.circle.com/wallets/dev/configurator",
        entitySecretCipherText: entitySecretCipherText,
      },
    };
    res.status(201).send(createEntitySecretCiphertextResponse);
  } catch (error) {
    res
    //@ts-ignore
    .status(error.response.status)
    //@ts-ignore
    .header(error.response.header)
    //@ts-ignore
    .send(error.response.data);
  }
});

export default router;
