import "dotenv/config";
import { Router, Request, Response } from "express";
import { TokenLookupApi } from "../../client/generated/apis/token-lookup-api";

const router = Router();

const tokenLookupApi = new TokenLookupApi({
  accessToken: process.env.API_KEY,
  isJsonMime: (mime: string) => mime.includes("json"),
});

router.get("/tokens/:id", async (req: Request, res: Response) => {
  const response = await tokenLookupApi.getTokenId(req.params.id);
  res
    .header("X-Request-Id", response.headers["x-request-id"])
    .send(response.data);
});

export default router;
