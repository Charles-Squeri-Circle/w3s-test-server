import "dotenv/config";
import { Router, Request, Response } from "express";
import { WalletSetsApi } from "../../client/generated/apis/wallet-sets-api";

const router = Router();

const walletSetsApi = new WalletSetsApi(
  {
    accessToken: process.env.API_KEY,
    isJsonMime: (mime: string) => mime.includes("json"),
  },
  process.env.BASE_URL
);

router.post("/developer/walletSets", async (req: Request, res: Response) => {
  const response = await walletSetsApi.createWalletSet(req.body);
  res
    .header("X-Request-Id", response.headers["x-request-id"])
    .send(response.data);
});

router.put("/developer/walletSets/:id", async (req: Request, res: Response) => {
  const response = await walletSetsApi.updateWalletSet(req.params.id, req.body);
  res
    .header("X-Request-Id", response.headers["x-request-id"])
    .send(response.data);
});

router.get("/developer/walletSets", async (req: Request, res: Response) => {
  const response = await walletSetsApi.listWalletSets(
    //@ts-ignore
    req.query.from,
    req.query.to,
    req.query.pageBefore,
    req.query.pageAfter,
    req.query.pageSize
  );
  res
    .header("X-Request-Id", response.headers["x-request-id"])
    .send(response.data);
});

router.put("/walletSets/:id", async (req: Request, res: Response) => {
  const response = await walletSetsApi.updateWalletSet(req.params.id, req.body);
  res
    .header("X-Request-Id", response.headers["x-request-id"])
    .send(response.data);
});

router.get("/walletSets/:id", async (req: Request, res: Response) => {
  const response = await walletSetsApi.getWalletSet(req.params.id);
  res
    .header("X-Request-Id", response.headers["x-request-id"])
    .send(response.data);
});

export default router;
