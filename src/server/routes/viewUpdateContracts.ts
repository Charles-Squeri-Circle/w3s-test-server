import "dotenv/config";
import { Router, Request, Response } from "express";
import { ViewUpdateApi } from "../../client/generated/apis/view-update-api";

const router = Router();

const viewUpdateApi = new ViewUpdateApi(
  {
    accessToken: process.env.API_KEY,
    isJsonMime: (mime: string) => mime.includes("json"),
  },
  process.env.BASE_URL
);

router.get("/contracts/", async (req: Request, res: Response) => {
  const response = await viewUpdateApi.listContracts(
    //@ts-ignore
    req.query.blockchain,
    req.query.contractInputType,
    req.query.deployerAddress,
    req.query.name,
    req.query.status,
    req.query.from,
    req.query.to,
    req.query.pageBefore,
    req.query.pageAfter,
    req.query.pageSize
  );
  res
    .header("X-Request-Id", response.headers["x-request-id"])
    .send(response.data);
});

router.get("/contracts/:id", async (req: Request, res: Response) => {
  const response = await viewUpdateApi.getContract(req.params.id);
  res
    .header("X-Request-Id", response.headers["x-request-id"])
    .send(response.data);
});

router.patch("/contracts/:id", async (req: Request, res: Response) => {
  const response = await viewUpdateApi.updateContract(req.params.id, req.body);
  res
    .header("X-Request-Id", response.headers["x-request-id"])
    .send(response.data);
});

export default router;
