import "dotenv/config";
import { Router, Request, Response } from "express";
import { CreateUserTokenInitialize } from "../../client/custom/apis/createUserTokenInitialize";

const router = Router();

router.post("/", async (req: Request, res: Response) => {
  const CreateUserTokenInitializeResponse = await CreateUserTokenInitialize();

  res.status(201).send(CreateUserTokenInitializeResponse);
});

export default router;
