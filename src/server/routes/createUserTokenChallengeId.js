import "dotenv/config";
import { Router } from "express";
import { createUserTokenChallengeId } from "../../client/custom/apis/createUserTokenChallengeId.js";

const router = Router();

router.post("/createUserTokenChallengeId", async (req, res) => {
  try {
    const response = await createUserTokenChallengeId();
    res.status(201).send(response);
  } catch (error) {
    res
    .status(error.response.status)
    .header(error.response.header)
    .send(error.response.data);
  }
});

export default router;
