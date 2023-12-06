import "dotenv/config";
import { Router } from "express";
import { initiateUserControlledWalletsClient } from "@circle-fin/user-controlled-wallets";
import { initiateDeveloperControlledWalletsClient } from "@circle-fin/developer-controlled-wallets";

const userWalletClient = initiateUserControlledWalletsClient({
  apiKey: process.env.API_KEY,
});

const developerWalletClient = initiateDeveloperControlledWalletsClient({
  apiKey: process.env.API_KEY,
  entitySecret: process.env.ENTITY_SECRET,
});

const router = Router();

router.post("/user/sign/message", async (req, res) => {
  if (req.header("X-User-Token")) {
    req.body.userToken = req.header("X-User-Token");
    try {
      const response = await userWalletClient.signMessage(req.body);
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

router.post("/user/sign/typedData", async (req, res) => {
  if (req.header("X-User-Token")) {
    req.body.userToken = req.header("X-User-Token");
    try {
      const response = await userWalletClient.signTypedData(req.body);
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

router.post("/developer/sign/message", async (req, res) => {
  try {
    req.body.entitySecretCiphertext = entitySecretCiphertext;
    const response = await signingApi.signMessage(req.body);
    delete response.headers["transfer-encoding"];
    res.header(response.headers).send({ data: response.data });
  } catch (error) {
    res
      .status(error.response.status)
      .header(error.response.header)
      .send(error.response.data);
  }
});

router.post("/developer/sign/typedData", async (req, res) => {
  try {
    const response = await signingApi.signTypedData(req.body);
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
