import "dotenv/config";
import { Router, Request, Response } from "express";
import { TokenLookupApi } from "../../client/generated/apis/token-lookup-api";

const router = Router();

const tokenLookupApi = new TokenLookupApi({
  accessToken: process.env.API_KEY,
  isJsonMime: (mime: string) => mime.includes("json"),
});

router.get("/tokens/:id", async (req: Request, res: Response) => {
  try {
    const response = await tokenLookupApi.getTokenId(req.params.id);
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
