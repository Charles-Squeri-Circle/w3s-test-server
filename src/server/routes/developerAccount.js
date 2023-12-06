import "dotenv/config";
import { Router } from "express";
import { initiateDeveloperControlledWalletsClient } from '@circle-fin/developer-controlled-wallets'
const client = initiateDeveloperControlledWalletsClient({
  apiKey: process.env.API_KEY,
  entitySecret: process.env.ENTITY_SECRET,
})
const router = Router();

// https://developers.circle.com/w3s/reference/getentityconfig

router.get("/publicKey", async (req, res) => {
  try {
    const response = await client.getPublicKey();
    delete response.headers['transfer-encoding'];
    console.log(response);
    res.header(response.headers).send({ data: response.data });
  } catch (error) {
    res
      .status(error.response.status)
      .header(error.response.header)
      .send(error.response.data);
  }
});

export default router;
