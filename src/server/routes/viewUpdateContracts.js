import "dotenv/config";
import { Router } from "express";
import { initiateSmartContractPlatformClient } from "@circle-fin/smart-contract-platform";
const client = initiateSmartContractPlatformClient({
  apiKey: process.env.API_KEY,
  entitySecret: process.env.ENTITY_SECRET,
});

const router = Router();

router.get("/contracts", async (req, res) => {
  try {
    const response = await client.listContracts(req.query);
    delete response.headers["transfer-encoding"];
    res.header(response.headers).send({ data: response.data });
  } catch (error) {
    res
      .status(error.response.status)
      .header(error.response.header)
      .send(error.response.data);
  }
});

router.get("/contracts/:id", async (req, res) => {
  try {
    const response = await client.getContract({ id: req.params.id });
    delete response.headers["transfer-encoding"];
    res.header(response.headers).send({ data: response.data });
  } catch (error) {
    res
      .status(error.response.status)
      .header(error.response.header)
      .send(error.response.data);
  }
});

router.patch("/contracts/:id", async (req, res) => {
  try {
    req.body.id = req.params.id;
    const response = await client.updateContract(req.body);
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
