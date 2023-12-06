import "dotenv/config";
import { Router } from "express";
import { initiateUserControlledWalletsClient } from '@circle-fin/user-controlled-wallets'
const client = initiateUserControlledWalletsClient({
  apiKey: process.env.API_KEY
})

const router = Router();

router.get("/tokens/:id", async (req, res) => {
  try {
    const response = await client.getToken({ id: req.params.id });
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
