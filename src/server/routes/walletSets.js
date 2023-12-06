import "dotenv/config";
import { Router } from "express";
import { initiateDeveloperControlledWalletsClient } from "@circle-fin/developer-controlled-wallets";

const client = initiateDeveloperControlledWalletsClient({
  apiKey: process.env.API_KEY,
  entitySecret: process.env.ENTITY_SECRET,
});

const router = Router();

router.post("/developer/walletSets", async (req, res) => {
  try {
      const response = await client.createWalletSet(req.body);
      delete response.headers['transfer-encoding'];
    res.header(response.headers).send({ data: response.data });
  } catch (error) {
    res
      .status(error.response.status)
      .header(error.response.header)
      .send(error.response.data);
  }
});

router.put("/developer/walletSets/:id", async (req, res) => {
  try {
    req.body.id = req.params.id;
    const response = await client.updateWalletSet(
      req.body
    );
    delete response.headers['transfer-encoding'];
    res.header(response.headers).send({ data: response.data });
  } catch (error) {
    res
      .status(error.response.status)
      .header(error.response.header)
      .send(error.response.data);
  }
});

router.get("/walletSets", async (req, res) => {
  try {
    const response = await client.listWalletSets(
      req.query
    );
    delete response.headers['transfer-encoding'];
    res.header(response.headers).send({ data: response.data });
  } catch (error) {
    res
      .status(error.response.status)
      .header(error.response.header)
      .send(error.response.data);
  }
});

router.put("/walletSets/:id", async (req, res) => {
  try {
    req.body.id = req.params.id;
    const response = await client.updateWalletSet(
      req.body
    );
    delete response.headers['transfer-encoding'];
    res.header(response.headers).send({ data: response.data });
  } catch (error) {
    res
      .status(error.response.status)
      .header(error.response.header)
      .send(error.response.data);
  }
});

router.get("/walletSets/:id", async (req, res) => {
  try {
    const response = await client.getWalletSet(req.params);
    delete response.headers['transfer-encoding'];
    res.header(response.headers).send({ data: response.data });
  } catch (error) {
    res
      .status(error.response.status)
      .header(error.response.header)
      .send(error.response.data);
  }
});

export default router;
