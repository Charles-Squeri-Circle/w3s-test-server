import "dotenv/config";
import { Router, Request, Response } from "express";
import { WalletsApi } from "../../client/generated/apis/wallets-api";
import { createEntitySecretCiphertext } from "../../client/custom/apis/createEntitySecretCiphertext";

const router = Router();

const walletsApi = new WalletsApi({
  accessToken: process.env.API_KEY,
  isJsonMime: (mime: string) => mime.includes("json"),
});

router.post("/user/wallets", async (req: Request, res: Response) => {
  if (req.header("X-User-Token")) {
    const xUserToken: string = req.header("X-User-Token")!;
    try {
      const response = await walletsApi.createUserWallet(xUserToken, req.body);
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

router.post("/developer/wallets", async (req: Request, res: Response) => {
  try {
    const entitySecretCiphertext: string | undefined =
      await createEntitySecretCiphertext();
    if (typeof entitySecretCiphertext === "string") {
      req.body.entitySecretCiphertext = entitySecretCiphertext!;
      const response = await walletsApi.createDeveloperWallet(req.body);
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

router.get("/wallets", async (req: Request, res: Response) => {
  try {
    const response = await walletsApi.listWallets(
      req.header("X-User-Token"),
      //@ts-ignore
      req.query.address,
      req.query.blockchain,
      req.query.userId,
      req.query.walletSetId,
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

// Added X-User-Token to OAS file since I used developer controlled wallets
router.get("/wallets/:id", async (req: Request, res: Response) => {
  try {
    const response = await walletsApi.getWallet(
      req.params.id,
      req.header("X-User-Token")
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

router.put("/wallets/:id", async (req: Request, res: Response) => {
  try {
    const response = await walletsApi.updateWallet(
      req.params.id,
      req.body,
      req.header("X-User-Token")
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

router.get("/wallets/:id/balances", async (req: Request, res: Response) => {
  try {
    const response = await walletsApi.listWalletBallance(
      req.params.id,
      req.header("X-User-Token"),
      //@ts-ignore
      req.query.includeAll,
      req.query.tokenAddress,
      req.query.tokenAddress,
      req.query.standard,
      req.query.from,
      req.query.to,
      req.query.pageBefore,
      req.query.pageAfter,
      req.query.pageSize
    );
    // Temporary fix Content-Length and transfer-encoding collision. They are supposed to be mutually exclusive.
    // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Transfer-Encoding#directives
    // Attempted to use express middle ware response.removeHeader() to fix this issue but it doesn't work for Content-Length
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

router.get("/wallets/:id/nfts", async (req: Request, res: Response) => {
  try {
    const response = await walletsApi.listWalletNfts(
      req.params.id,
      req.header("X-User-Token"),
      //@ts-ignore
      req.query.includeAll,
      req.query.tokenAddress,
      req.query.tokenAddress,
      req.query.standard,
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

export default router;
