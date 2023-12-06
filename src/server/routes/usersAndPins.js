import "dotenv/config";
import { Router } from "express";
import { initiateUserControlledWalletsClient } from "@circle-fin/user-controlled-wallets";
const client = initiateUserControlledWalletsClient({
  apiKey: process.env.API_KEY,
});

const router = Router();

router.post("/users", async (req, res) => {
  try {
    const response = await client.createUser(req.body);
    delete response.headers["transfer-encoding"];
    res.header(response.headers).send({ data: response.data });
  } catch (error) {
    res
      .status(error.response.status)
      .header(error.response.header)
      .send(error.response.data);
  }
});

router.get("/users", async (req, res) => {
  try {
    const response = await client.listUsers(req.query);
    delete response.headers["transfer-encoding"];
    res.header(response.headers).send({ data: response.data });
  } catch (error) {
    res
      .status(error.response.status)
      .header(error.response.header)
      .send(error.response.data);
  }
});

router.get("/users/:id", async (req, res) => {
  try {
    const response = await client.getUser({ userId: req.params.id });
    delete response.headers["transfer-encoding"];
    res.header(response.headers).send({ data: response.data });
  } catch (error) {
    res
      .status(error.response.status)
      .header(error.response.header)
      .send(error.response.data);
  }
});

router.post("/users/token", async (req, res) => {
  try {
    const response = await client.getUserToken(req.body);
    delete response.headers["transfer-encoding"];
    res.header(response.headers).send({ data: response.data });
  } catch (error) {
    res
      .status(error.response.status)
      .header(error.response.header)
      .send(error.response.data);
  }
});

router.get("/user", async (req, res) => {
  if (req.header("X-User-Token")) {
    try {
      const response = await client.getUserStatus({
        userToken: req.header("X-User-Token"),
      });
      delete response.headers["transfer-encoding"];
      res.header(response.headers).send({ data: response.data });
    } catch (error) {
      res
        .status(error.response.status)
        .header(error.response.header)
        .send(error.response.data);
    }
  } else {
    res.send("Please add an X-User-Token to the header");
  }
});

router.post("/user/initialize", async (req, res) => {
  if (req.header("X-User-Token")) {
    req.body.userToken = req.header("X-User-Token");
    try {
      const response = await client.createUserPinWithWallets(req.body);
      delete response.headers["transfer-encoding"];
      res.header(response.headers).send({ data: response.data });
    } catch (error) {
      res
        .status(error.response.status)
        .header(error.response.header)
        .send(error.response.data);
    }
  } else {
    res.send("Please add an X-User-Token to the header");
  }
});

router.get("/user/challenges", async (req, res) => {
  if (req.header("X-User-Token")) {
    try {
      const response = await client.listUserChallenges({
        userToken: req.header("X-User-Token"),
        challengeStatus: req.params.status,
      });
      delete response.headers["transfer-encoding"];
      res.header(response.headers).send({ data: response.data });
    } catch (error) {
      res
        .status(error.response.status)
        .header(error.response.header)
        .send(error.response.data);
    }
  } else {
    res.send("Please add an X-User-Token to the header");
  }
});

router.get("/user/challenges/:id", async (req, res) => {
  if (req.header("X-User-Token")) {
    try {
      const response = await client.getUserChallenge({
        userToken: req.header("X-User-Token"),
        challengeId: req.params.id, // This should likely be ID rather than challenge ID
      });
      delete response.headers["transfer-encoding"];
      res.header(response.headers).send({ data: response.data });
    } catch (error) {
      res
        .status(error.response.status)
        .header(error.response.header)
        .send(error.response.data);
    }
  } else {
    res.send("Please add an X-User-Token to the header");
  }
});

router.post("/user/pin", async (req, res) => {
  if (req.header("X-User-Token")) {
    req.body.userToken = req.header("X-User-Token");
    try {
      const response = await client.createUserPin(req.body);
      delete response.headers["transfer-encoding"];
      res.header(response.headers).send({ data: response.data });
    } catch (error) {
      res
        .status(error.response.status)
        .header(error.response.header)
        .send(error.response.data);
    }
  } else {
    res.send("Please add an X-User-Token to the header");
  }
});

router.put("/user/pin", async (req, res) => {
  if (req.header("X-User-Token")) {
    req.body.userToken = req.header("X-User-Token");
    try {
      const response = await client.updateUserPin(req.body);
      delete response.headers["transfer-encoding"];
      res.header(response.headers).send({ data: response.data });
    } catch (error) {
      res
        .status(error.response.status)
        .header(error.response.header)
        .send(error.response.data);
    }
  } else {
    res.send("Please add an X-User-Token to the header");
  }
});

router.post("/user/pin/restore", async (req, res) => {
  if (req.header("X-User-Token")) {
    req.body.userToken = req.header("X-User-Token");
    try {
      const response = await client.restoreUserPin(req.body);
      delete response.headers["transfer-encoding"];
      res.header(response.headers).send({ data: response.data });
    } catch (error) {
      res
        .status(error.response.status)
        .header(error.response.header)
        .send(error.response.data);
    }
  } else {
    res.send("Please add an X-User-Token to the header");
  }
});

export default router;
