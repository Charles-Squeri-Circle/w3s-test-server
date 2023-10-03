import "dotenv/config";
import { Router, Request, Response } from "express";
import { DeveloperAccountApi } from "../../client/generated/apis/developer-account-api";

const router = Router();

const developerAccountApi = new DeveloperAccountApi({
  accessToken: process.env.API_KEY,
  isJsonMime: (mime: string) => mime.includes("json"),
});

router.get("/", async (req: Request, res: Response) => {
  try {
    const response = await developerAccountApi.getEntityConfig();
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
});

router.get("/publicKey", async (req: Request, res: Response) => {
  try {
    const response = await developerAccountApi.getPublicKey();
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
});

export default router;
