import "dotenv/config";
import { Router, Request, Response } from "express";
import { InteractApi } from "../../client/generated/apis/interact-api";

const router = Router();

const interactApi = new InteractApi({
  accessToken: process.env.API_KEY,
  isJsonMime: (mime: string) => mime.includes("json"),
});

router.post("/contracts/:id/read", async (req: Request, res: Response) => {
  try {
    const response = await interactApi.readContract(req.params.id, req.body);
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
