import "dotenv/config";
import { Router } from "express";
import { initiateUserControlledWalletsClient } from "@circle-fin/user-controlled-wallets";
import { initiateDeveloperControlledWalletsClient } from "@circle-fin/developer-controlled-wallets";

const userWalletClient = initiateUserControlledWalletsClient({
  apiKey: process.env.API_KEY,
  entitySecret: process.env.ENTITY_SECRET,
});

const developerWalletClient = initiateDeveloperControlledWalletsClient({
  apiKey: process.env.API_KEY,
  entitySecret: process.env.ENTITY_SECRET,
});

const router = Router();

router.post("/user/wallets", async (req, res) => {
  if (req.header("X-User-Token")) {
    req.body.userToken = req.header("X-User-Token");
    try {
      const response = await userWalletClient.createWallet(req.body);
      delete response.headers["transfer-encoding"];
      res.header(response.headers).send({ data: response.data });
    } catch (error) {
      res
        .status(error.response.status)
        .header(error.response.header)
        .send(error.response.data);
    }
  } else {
    res.send("Please add an X-User-Token to the header");
  }
});

router.post("/developer/wallets", async (req, res) => {
  try {
    const response = await developerWalletClient.createWallets(req.body);
    delete response.headers["transfer-encoding"];
    res.header(response.headers).send({ data: response.data });
  } catch (error) {
    res
      .status(error.response.status)
      .header(error.response.header)
      .send(error.response.data);
  }
});

router.get("/wallets", async (req, res) => {
  try {
    req.query.userToken = req.header("X-User-Token");
    const response = await userWalletClient.listWallets(req.query);
    delete response.headers["transfer-encoding"];
    res.header(response.headers).send({ data: response.data });
  } catch (error) {
    res
      .status(error.response.status)
      .header(error.response.header)
      .send(error.response.data);
  }
});

// Added X-User-Token to OAS file since I used developer controlled wallets
router.get("/wallets/:id", async (req, res) => {
  try {
    const response = await userWalletClient.getWallet({
      id: req.params.id,
      userToken: req.header("X-User-Token"),
      userId: req.query.userId,
    });
    delete response.headers["transfer-encoding"];
    res.header(response.headers).send({ data: response.data });
  } catch (error) {
    res
      .status(error.response.status)
      .header(error.response.header)
      .send(error.response.data);
  }
});

router.put("/wallets/:id", async (req, res) => {
  try {
    req.body.userToken = req.header("X-User-Token");
    req.body.id = req.params.id;
    const response = await userWalletClient.updateWallet(req.body);
    delete response.headers["transfer-encoding"];
    res.header(response.headers).send({ data: response.data });
  } catch (error) {
    res
      .status(error.response.status)
      .header(error.response.header)
      .send(error.response.data);
  }
});

router.get("/wallets/:id/balances", async (req, res) => {
  try {
    req.query.userToken = req.header("X-User-Token");
    req.query.walletId = req.params.id;
    const response = await userWalletClient.getWalletTokenBalance(req.query);
    // Temporary fix Content-Length and transfer-encoding collision. They are supposed to be mutually exclusive.
    // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Transfer-Encoding#directives
    // Attempted to use express middle ware response.removeHeader() to fix this issue but it doesn't work for Content-Length
    delete response.headers["transfer-encoding"];
    res.header(response.headers).send({ data: response.data });
  } catch (error) {
    res
      .status(error.response.status)
      .header(error.response.header)
      .send(error.response.data);
  }
});

router.get("/wallets/:id/nfts", async (req, res) => {
  try {
    req.query.userToken = req.header("X-User-Token");
    req.query.walletId = req.params.id;
    const response = await userWalletClient.getWalletNFTBalance(req.query);
    delete response.headers["transfer-encoding"];
    res.header(response.headers).send({ data: response.data });
  } catch (error) {
    res
      .status(error.response.status)
      .header(error.response.header)
      .send(error.response.data);
  }
});

export default router;
