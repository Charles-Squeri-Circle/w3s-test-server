import "dotenv/config";
import { Router, Request, Response } from "express";
import { WalletSetsApi } from "../../client/generated/apis/wallet-sets-api";
import { createEntitySecretCiphertext } from "../../client/custom/apis/createEntitySecretCiphertext";

const router = Router();

const walletSetsApi = new WalletSetsApi({
  accessToken: process.env.API_KEY,
  isJsonMime: (mime: string) => mime.includes("json"),
});

router.post("/developer/walletSets", async (req: Request, res: Response) => {
  try {
    const entitySecretCiphertext: string | undefined =
      await createEntitySecretCiphertext();
    if (typeof entitySecretCiphertext === "string") {
      req.body.entitySecretCiphertext = entitySecretCiphertext!;
      const response = await walletSetsApi.createWalletSet(req.body);
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

router.put("/developer/walletSets/:id", async (req: Request, res: Response) => {
  try {
    const response = await walletSetsApi.updateWalletSet(
      req.params.id,
      req.body
    );
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

router.get("/walletSets", async (req: Request, res: Response) => {
  try {
    const response = await walletSetsApi.listWalletSets(
      //@ts-ignore
      req.query.from,
      req.query.to,
      req.query.pageBefore,
      req.query.pageAfter,
      req.query.pageSize
    );
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

router.put("/walletSets/:id", async (req: Request, res: Response) => {
  try {
    const response = await walletSetsApi.updateWalletSet(
      req.params.id,
      req.body
    );
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

router.get("/walletSets/:id", async (req: Request, res: Response) => {
  try {
    const response = await walletSetsApi.getWalletSet(req.params.id);
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
