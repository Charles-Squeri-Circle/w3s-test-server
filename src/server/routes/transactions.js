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

router.post("/user/transactions/transfer", async (req, res) => {
  if (req.header("X-User-Token")) {
    req.body.userToken = req.header("X-User-Token");
    try {
      const response = await userWalletClient.createTransaction(req.body);
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

// In OAS file id up to match same order as wallets
router.post("/user/transactions/:id/accelerate", async (req, res) => {
  if (req.header("X-User-Token")) {
    req.body.userToken = req.header("X-User-Token");
    req.body.id = req.params.id;
    try {
      const response = await userWalletClient.accelerateTransaction(req.body);
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

router.post("/user/transactions/:id/cancel", async (req, res) => {
  if (req.header("X-User-Token")) {
    req.body.userToken = req.header("X-User-Token");
    req.body.id = req.params.id;
    try {
      const response = await userWalletClient.cancelTransaction(req.body);
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

router.post("/developer/transactions/transfer", async (req, res) => {
  try {
    const response = await developerWalletClient.createTransaction(req.body);
    delete response.headers["transfer-encoding"];
    res.header(response.headers).send({ data: response.data });
  } catch (error) {
    res
      .status(error.response.status)
      .header(error.response.header)
      .send(error.response.data);
  }
});

// In OAS file id up to match same order as wallets
router.post("/developer/transactions/:id/accelerate", async (req, res) => {
  try {
    req.body.id = req.params.id;
    const response = await developerWalletClient.accelerateTransaction(
      req.body
    );
    delete response.headers["transfer-encoding"];
    res.header(response.headers).send({ data: response.data });
  } catch (error) {
    res
      .status(error.response.status)
      .header(error.response.header)
      .send(error.response.data);
  }
});

router.post("/developer/transactions/:id/cancel", async (req, res) => {
  try {
    req.body.id = req.params.id;
    const response = await developerWalletClient.cancelTransaction(req.body);
    delete response.headers["transfer-encoding"];
    res.header(response.headers).send({ data: response.data });
  } catch (error) {
    res
      .status(error.response.status)
      .header(error.response.header)
      .send(error.response.data);
  }
});

router.post("/developer/transactions/contractExecution", async (req, res) => {
  try {
    const response =
      await transactionsApi.createDeveloperTransactionContractExecution(
        req.body
      );
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
router.get("/transactions", async (req, res) => {
  try {
    // This needs to be corrected to support developer controlled wallets and the query params are likely not right.
    const response = await userWalletClient.listTransactions(req.query);
    delete response.headers["transfer-encoding"];
    res.header(response.headers).send({ data: response.data });
  } catch (error) {
    res
      .status(error.response.status)
      .header(error.response.header)
      .send(error.response.data);
  }
});

// This endpoint needs another look.
router.get("/transactions/:id", async (req, res) => {
  try {
    req.body.userToken = req.header("X-User-Token");
    req.body.id = req.params.id;
    req.body.txType = req.query.txType;
    const response = await userWalletClient.getTransaction(req.body);
    delete response.headers["transfer-encoding"];
    res.header(response.headers).send({ data: response.data });
  } catch (error) {
    res
      .status(error.response.status)
      .header(error.response.header)
      .send(error.response.data);
  }
});

router.post("/transactions/transfer/estimateFee", async (req, res) => {
  try {
    const response = await userWalletClient.estimateTransferFee(req.body);
    delete response.headers["transfer-encoding"];
    res.header(response.headers).send({ data: response.data });
  } catch (error) {
    res
      .status(error.response.status)
      .header(error.response.header)
      .send(error.response.data);
  }
});

router.post("/user/transactions/contractExecution", async (req, res) => {
  try {
    const response = await userWalletClient.estimateContractExecutionFee(
      req.body
    );
    delete response.headers["transfer-encoding"];
    res.header(response.headers).send({ data: response.data });
  } catch (error) {
    res
      .status(error.response.status)
      .header(error.response.header)
      .send(error.response.data);
  }
});

router.post("/transactions/validateAddress", async (req, res) => {
  try {
    const response = await userWalletClient.validateAddress(req.body);
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
