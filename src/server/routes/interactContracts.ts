import "dotenv/config";
import { Router, Request, Response } from "express";
import { InteractApi } from "../../client/generated/apis/interact-api";

const router = Router();

const interactApi = new InteractApi(
  {
    accessToken: process.env.API_KEY,
    isJsonMime: (mime: string) => mime.includes("json"),
  },
  process.env.BASE_URL
);

router.post("/contracts/:id/read", async (req: Request, res: Response) => {
  const response = await interactApi.readContract(req.params.id, req.body);
  res
    .header("X-Request-Id", response.headers["x-request-id"])
    .send(response.data);
});

export default router;
