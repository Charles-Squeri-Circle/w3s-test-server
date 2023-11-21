import "dotenv/config";
import { Router, Request, Response } from "express";
import { TemplatesApi } from "../../client/generated/apis/templates-api";
import { createEntitySecretCiphertext } from "../../client/custom/apis/createEntitySecretCiphertext";

const router = Router();

const templatesApi = new TemplatesApi({
  accessToken: process.env.API_KEY,
  isJsonMime: (mime: string) => mime.includes("json"),
});

router.post("/templates/:id/deploy", async (req: Request, res: Response) => {
  try {
    const entitySecretCiphertext: string | undefined =
      await createEntitySecretCiphertext();
    if (typeof entitySecretCiphertext === "string") {
      req.body.entitySecretCiphertext = entitySecretCiphertext!;
      const response = await templatesApi.deployContractTemplate(req.params.id, req.body);
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
});

router.post("/templates/:id/deploy/estimateFee", async (req: Request, res: Response) => {
  try {
    const entitySecretCiphertext: string | undefined =
      await createEntitySecretCiphertext();
    if (typeof entitySecretCiphertext === "string") {
      req.body.entitySecretCiphertext = entitySecretCiphertext!;
      const response = await templatesApi.estimateContractTemplateDeploy(req.params.id, req.body);
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
});

export default router;
