import "dotenv/config";
import { Router, Request, Response } from "express";
import { CreateUserTokenChallengeId } from "../../client/custom/apis/createUserTokenChallengeId";

const router = Router();

router.post("/createUserTokenChallengeId", async (req: Request, res: Response) => {
  const response = await CreateUserTokenChallengeId();

  res.status(201).send(response);
});

export default router;
