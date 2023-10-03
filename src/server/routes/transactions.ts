import "dotenv/config";
import { Router, Request, Response } from "express";
import { TransactionsApi } from "../../client/generated/apis/transactions-api";
import { createEntitySecretCiphertext } from "../../client/custom/apis/createEntitySecretCiphertext";

const router = Router();

const transactionsApi = new TransactionsApi({
  accessToken: process.env.API_KEY,
  isJsonMime: (mime: string) => mime.includes("json"),
});

router.post(
  "/user/transactions/transfer",
  async (req: Request, res: Response) => {
    if (req.header("X-User-Token")) {
      const xUserToken: string = req.header("X-User-Token")!;
      try {
        const response =
          await transactionsApi.createUserTransactionTransferChallenge(
            xUserToken,
            req.body
          );
        delete response.headers['transfer-encoding'];
    res.header(response.headers).send(response.data);
      } catch (error) {
        res
          //@ts-ignore
          .status(error.response.status)
          //@ts-ignore
          .header(error.response.header)
          //@ts-ignore
          .send(error.response.data);
      }
    } else {
      res.send("Please add an X-User-Token to the header");
    }
  }
);

// In OAS file id up to match same order as wallets
router.post(
  "/user/transactions/:id/accelerate",
  async (req: Request, res: Response) => {
    if (req.header("X-User-Token")) {
      const xUserToken: string = req.header("X-User-Token")!;
      try {
        const response =
          await transactionsApi.createUserTransactionAccelerateChallenge(
            req.params.id,
            xUserToken,
            req.body
          );
        delete response.headers['transfer-encoding'];
    res.header(response.headers).send(response.data);
      } catch (error) {
        res
          //@ts-ignore
          .status(error.response.status)
          //@ts-ignore
          .header(error.response.header)
          //@ts-ignore
          .send(error.response.data);
      }
    } else {
      res.send("Please add an X-User-Token to the header");
    }
  }
);

router.post(
  "/user/transactions/:id/cancel",
  async (req: Request, res: Response) => {
    if (req.header("X-User-Token")) {
      const xUserToken: string = req.header("X-User-Token")!;
      try {
        const response =
          await transactionsApi.createUserTransactionCancelChallenge(
            req.params.id,
            xUserToken,
            req.body
          );
        delete response.headers['transfer-encoding'];
    res.header(response.headers).send(response.data);
      } catch (error) {
        res
          //@ts-ignore
          .status(error.response.status)
          //@ts-ignore
          .header(error.response.header)
          //@ts-ignore
          .send(error.response.data);
      }
    } else {
      res.send("Please add an X-User-Token to the header");
    }
  }
);

router.post(
  "/user/transactions/contractExecution",
  async (req: Request, res: Response) => {
    if (req.header("X-User-Token")) {
      const xUserToken: string = req.header("X-User-Token")!;
      try {
        const response =
          await transactionsApi.createUserTransactionContractExecutionChallenge(
            xUserToken,
            req.body
          );
        delete response.headers['transfer-encoding'];
    res.header(response.headers).send(response.data);
      } catch (error) {
        res
          //@ts-ignore
          .status(error.response.status)
          //@ts-ignore
          .header(error.response.header)
          //@ts-ignore
          .send(error.response.data);
      }
    } else {
      res.send("Please add an X-User-Token to the header");
    }
  }
);

router.post(
  "/developer/transactions/transfer",
  async (req: Request, res: Response) => {
    try {
      const entitySecretCiphertext: string | undefined =
        await createEntitySecretCiphertext();
      if (typeof entitySecretCiphertext === "string") {
        req.body.entitySecretCiphertext = entitySecretCiphertext!;
        const response =
          await transactionsApi.createDeveloperTransactionTransfer(req.body);
        delete response.headers['transfer-encoding'];
    res.header(response.headers).send(response.data);
      }
    } catch (error) {
      res
        //@ts-ignore
        .status(error.response.status)
        //@ts-ignore
        .header(error.response.header)
        //@ts-ignore
        .send(error.response.data);
    }
  }
);

// In OAS file id up to match same order as wallets
router.post(
  "/developer/transactions/:id/accelerate",
  async (req: Request, res: Response) => {
    try {
      const entitySecretCiphertext: string | undefined =
        await createEntitySecretCiphertext();
      if (typeof entitySecretCiphertext === "string") {
        req.body.entitySecretCiphertext = entitySecretCiphertext!;
        const response =
          await transactionsApi.createDeveloperTransactionAccelerate(
            req.params.id,
            req.body
          );
        delete response.headers['transfer-encoding'];
    res.header(response.headers).send(response.data);
      }
    } catch (error) {
      res
        //@ts-ignore
        .status(error.response.status)
        //@ts-ignore
        .header(error.response.header)
        //@ts-ignore
        .send(error.response.data);
    }
  }
);

router.post(
  "/developer/transactions/:id/cancel",
  async (req: Request, res: Response) => {
    try {
      const entitySecretCiphertext: string | undefined =
        await createEntitySecretCiphertext();
      if (typeof entitySecretCiphertext === "string") {
        req.body.entitySecretCiphertext = entitySecretCiphertext!;
        const response = await transactionsApi.createDeveloperTransactionCancel(
          req.params.id,
          req.body
        );
        delete response.headers['transfer-encoding'];
    res.header(response.headers).send(response.data);
      }
    } catch (error) {
      res
        //@ts-ignore
        .status(error.response.status)
        //@ts-ignore
        .header(error.response.header)
        //@ts-ignore
        .send(error.response.data);
    }
  }
);

router.post(
  "/developer/transactions/contractExecution",
  async (req: Request, res: Response) => {
    try {
      const entitySecretCiphertext: string | undefined =
        await createEntitySecretCiphertext();
      if (typeof entitySecretCiphertext === "string") {
        req.body.entitySecretCiphertext = entitySecretCiphertext!;
        const response =
          await transactionsApi.createDeveloperTransactionContractExecution(
            req.body
          );
        delete response.headers['transfer-encoding'];
    res.header(response.headers).send(response.data);
      }
    } catch (error) {
      res
        //@ts-ignore
        .status(error.response.status)
        //@ts-ignore
        .header(error.response.header)
        //@ts-ignore
        .send(error.response.data);
    }
  }
);

// Added X-User-Token to OAS file since I used developer controlled wallets
router.get("/transactions", async (req: Request, res: Response) => {
  try {
    const response = await transactionsApi.listTransactions(
      req.header("X-User-Token"),
      //@ts-ignore
      req.query.blockchain,
      req.query.custodyType,
      req.query.destinationAddress,
      req.query.includeAll,
      req.query.operation,
      req.query.state,
      req.query.txHash,
      req.query.txType,
      req.query.userId,
      req.query.walletIds,
      req.query.from,
      req.query.to,
      req.query.pageBefore,
      req.query.pageAfter,
      req.query.pageSize
    );
    delete response.headers['transfer-encoding'];
    res.header(response.headers).send(response.data);
  } catch (error) {
    res
      //@ts-ignore
      .status(error.response.status)
      //@ts-ignore
      .header(error.response.header)
      //@ts-ignore
      .send(error.response.data);
  }
});

router.get("/transactions/:id", async (req: Request, res: Response) => {
  try {
    const response = await transactionsApi.getTransaction(
      req.params.id,
      req.header("X-User-Token"),
      //@ts-ignore
      req.query.txType
    );
    delete response.headers['transfer-encoding'];
    res.header(response.headers).send(response.data);
  } catch (error) {
    res
      //@ts-ignore
      .status(error.response.status)
      //@ts-ignore
      .header(error.response.header)
      //@ts-ignore
      .send(error.response.data);
  }
});

router.post(
  "/transactions/transfer/estimateFee",
  async (req: Request, res: Response) => {
    try {
      const response = await transactionsApi.createTransferEstimateFee(
        req.body
      );
      delete response.headers['transfer-encoding'];
    res.header(response.headers).send(response.data);
    } catch (error) {
      res
        //@ts-ignore
        .status(error.response.status)
        //@ts-ignore
        .header(error.response.header)
        //@ts-ignore
        .send(error.response.data);
    }
  }
);

router.post(
  "/transactions/transfer/estimateFee",
  async (req: Request, res: Response) => {
    try {
      const response = await transactionsApi.createTransactionEstimateFee(
        req.body
      );
      delete response.headers['transfer-encoding'];
    res.header(response.headers).send(response.data);
    } catch (error) {
      res
        //@ts-ignore
        .status(error.response.status)
        //@ts-ignore
        .header(error.response.header)
        //@ts-ignore
        .send(error.response.data);
    }
  }
);

router.post(
  "/transactions/validateAddress",
  async (req: Request, res: Response) => {
    try {
      const response = await transactionsApi.createTransactionEstimateFee(
        req.body
      );
      delete response.headers['transfer-encoding'];
    res.header(response.headers).send(response.data);
    } catch (error) {
      res
        //@ts-ignore
        .status(error.response.status)
        //@ts-ignore
        .header(error.response.header)
        //@ts-ignore
        .send(error.response.data);
    }
  }
);

export default router;
