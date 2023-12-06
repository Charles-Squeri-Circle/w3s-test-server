import "dotenv/config";
import { Router } from "express";
import { initiateSmartContractPlatformClient } from "@circle-fin/smart-contract-platform";
const client = initiateSmartContractPlatformClient({
  apiKey: process.env.API_KEY,
  entitySecret: process.env.ENTITY_SECRET,
});

const router = Router();

router.post("/contracts/import", async (req, res) => {
  try {
    const response = await client.importContract(req.body);
    delete response.headers["transfer-encoding"];
    res.header(response.headers).send({ data: response.data });
  } catch (error) {
    res
      .status(error.response.status)
      .header(error.response.header)
      .send(error.response.data);
  }
});

router.post("/contracts/deploy", async (req, res) => {
  try {
    const response = await client.deployContract(req.body);
    delete response.headers["transfer-encoding"];
    res.header(response.headers).send({ data: response.data });
  } catch (error) {
    res
      .status(error.response.status)
      .header(error.response.header)
      .send(error.response.data);
  }
});

router.post("/contracts/deploy/estimateFee", async (req, res) => {
  try {
    const response = await client.estimateContractDeploy(req.body);
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
