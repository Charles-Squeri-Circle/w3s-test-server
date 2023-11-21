import "dotenv/config";
import { Router, Request, Response } from "express";
import { SigningApi } from "../../client/generated/apis/signing-api";
import { createEntitySecretCiphertext } from "../../client/custom/apis/createEntitySecretCiphertext";

const router = Router();

const signingApi = new SigningApi({
  accessToken: process.env.API_KEY,
  isJsonMime: (mime: string) => mime.includes("json"),
});

router.post("/user/sign/message", async (req: Request, res: Response) => {
  if (req.header("X-User-Token")) {
    const xUserToken: string = req.header("X-User-Token")!;
    try {
      const response = await signingApi.signUserMessage(xUserToken, req.body);
      delete response.headers['transfer-encoding'];
    res.header(response.headers).send(response.data);
    } catch (error) {
      res
        //@ts-ignore
        .status(error.response.status)
        //@ts-ignore
        .header(error.response.header)
        //@ts-ignore
        .send(error.response.data);
    }
  } else {
    res.send("Please add an X-User-Token to the header");
  }
});

router.post("/user/sign/typedData", async (req: Request, res: Response) => {
  if (req.header("X-User-Token")) {
    const xUserToken: string = req.header("X-User-Token")!;
    try {
      const response = await signingApi.signUserTypedData(xUserToken, req.body);
      delete response.headers['transfer-encoding'];
    res.header(response.headers).send(response.data);
    } catch (error) {
      res
        //@ts-ignore
        .status(error.response.status)
        //@ts-ignore
        .header(error.response.header)
        //@ts-ignore
        .send(error.response.data);
    }
  } else {
    res.send("Please add an X-User-Token to the header");
  }
});

router.post("/developer/sign/message", async (req: Request, res: Response) => {
  try {
    const entitySecretCiphertext: string | undefined =
      await createEntitySecretCiphertext();
    if (typeof entitySecretCiphertext === "string") {
      req.body.entitySecretCiphertext = entitySecretCiphertext!;
      const response = await signingApi.signDeveloperMessage(req.body);
      delete response.headers['transfer-encoding'];
    res.header(response.headers).send(response.data);
    }
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

router.post("/developer/sign/typedData", async (req: Request, res: Response) => {
  try {
    const entitySecretCiphertext: string | undefined =
      await createEntitySecretCiphertext();
    if (typeof entitySecretCiphertext === "string") {
      req.body.entitySecretCiphertext = entitySecretCiphertext!;
      const response = await signingApi.signDeveloperTypedData(req.body);
      delete response.headers['transfer-encoding'];
    res.header(response.headers).send(response.data);
    }
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
