import "dotenv/config";
import { Router, Request, Response } from "express";
import { DeployImportApi } from "../../client/generated/apis/deploy-import-api";

const router = Router();

const deployImportApi = new DeployImportApi({
  accessToken: process.env.API_KEY,
  isJsonMime: (mime: string) => mime.includes("json"),
});

router.post("/contracts/import", async (req: Request, res: Response) => {
  try {
    const response = await deployImportApi.importContract(req.body);
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

router.post("/contracts/deploy", async (req: Request, res: Response) => {
  try {
    const response = await deployImportApi.deployContract(req.body);
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
  "/contracts/deploy/estimateFee",
  async (req: Request, res: Response) => {
    try {
      const response = await deployImportApi.estimateContractDeploy(req.body);
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
