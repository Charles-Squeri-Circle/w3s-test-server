import "dotenv/config";
import { Router, Request, Response } from "express";
import { DeveloperAccountApi } from "../../client/generated/apis/developer-account-api";

const router = Router();

const developerAccountApi = new DeveloperAccountApi({
  accessToken: process.env.API_KEY,
  isJsonMime: (mime: string) => mime.includes("json"),
});

router.get("/", async (req: Request, res: Response) => {
  const response = await developerAccountApi.getEntityConfig();
  res
    .header("X-Request-Id", response.headers["x-request-id"])
    .send(response.data);
});

router.get("/publicKey", async (req: Request, res: Response) => {
  const response = await developerAccountApi.getPublicKey();
  res
    .header("X-Request-Id", response.headers["x-request-id"])
    .send(response.data);
});

export default router;
