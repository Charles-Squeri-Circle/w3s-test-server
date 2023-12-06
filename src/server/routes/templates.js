// Templates isn't supported in the SDKs yet.
import "dotenv/config";
import { Router } from "express";
import { initiateSmartContractPlatformClient } from "@circle-fin/smart-contract-platform";
const client = initiateSmartContractPlatformClient({
  apiKey: process.env.API_KEY,
  entitySecret: process.env.ENTITY_SECRET,
});

const router = Router();

router.post("/templates/:id/deploy", async (req, res) => {
  try {
      req.body.entitySecretCiphertext = entitySecretCiphertext;
      const response = await client.deployContractTemplate(req.params.id, req.body);
      delete response.headers['transfer-encoding'];
    res.header(response.headers).send({ data: response.data });
  } catch (error) {
    res
      .status(error.response.status)
      .header(error.response.header)
      .send(error.response.data);
  }
});

router.post("/templates/:id/deploy/estimateFee", async (req, res) => {
  try {
      req.body.entitySecretCiphertext = entitySecretCiphertext;
      const response = await client.estimateContractTemplateDeploy(req.params.id, req.body);
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
