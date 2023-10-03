import "dotenv/config";
import { Router, Request, Response } from "express";
import { ViewUpdateApi } from "../../client/generated/apis/view-update-api";

const router = Router();

const viewUpdateApi = new ViewUpdateApi({
  accessToken: process.env.API_KEY,
  isJsonMime: (mime: string) => mime.includes("json"),
});

router.get("/contracts/", async (req: Request, res: Response) => {
  try {
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

router.get("/contracts/:id", async (req: Request, res: Response) => {
  try {
    const response = await viewUpdateApi.getContract(req.params.id);
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

router.patch("/contracts/:id", async (req: Request, res: Response) => {
  try {
    const response = await viewUpdateApi.updateContract(
      req.params.id,
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
});

export default router;
