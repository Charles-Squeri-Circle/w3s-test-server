import "dotenv/config";
import { Router, Request, Response } from "express";
import { createUserTokenChallengeId } from "../../client/custom/apis/createUserTokenChallengeId";

const router = Router();

router.post("/createUserTokenChallengeId", async (req: Request, res: Response) => {
  try {
    const response = await createUserTokenChallengeId();
    res.status(201).send(response);
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
