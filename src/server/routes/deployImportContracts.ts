import "dotenv/config";
import { Router, Request, Response } from "express";
import { DeployImportApi } from "../../client/generated/apis/deploy-import-api";

const router = Router();

const deployImportApi = new DeployImportApi({
  accessToken: process.env.API_KEY,
  isJsonMime: (mime: string) => mime.includes("json"),
});

router.post("/contracts/import", async (req: Request, res: Response) => {
  const response = await deployImportApi.importContact(req.body);
  res
    .header("X-Request-Id", response.headers["x-request-id"])
    .send(response.data);
});

router.post("/contracts/deploy", async (req: Request, res: Response) => {
  const response = await deployImportApi.deployContract(req.body);
  res
    .header("X-Request-Id", response.headers["x-request-id"])
    .send(response.data);
});

router.post(
  "/contracts/deploy/estimateFee",
  async (req: Request, res: Response) => {
    const response = await deployImportApi.estimateContractDeploy(req.body);
    res
      .header("X-Request-Id", response.headers["x-request-id"])
      .send(response.data);
  }
);

export default router;
