import "dotenv/config";
import { Router } from "express";
import { initiateSmartContractPlatformClient } from "@circle-fin/smart-contract-platform";
const client = initiateSmartContractPlatformClient({
  apiKey: process.env.API_KEY,
  entitySecret: process.env.ENTITY_SECRET,
});

const router = Router();

router.post("/contracts/:id/read", async (req, res) => {
  try {
    const response = await client.readContract(req.params.id, req.body);
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
