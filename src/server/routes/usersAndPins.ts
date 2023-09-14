import "dotenv/config";
import { Router, Request, Response } from "express";
import { UsersAndPinsApi } from "../../client/generated/apis/users-and-pins-api";

const router = Router();

const usersAndPinsApi = new UsersAndPinsApi(
  {
    accessToken: process.env.API_KEY,
    isJsonMime: (mime: string) => mime.includes("json"),
  },
  process.env.BASE_URL
);

router.post("/users", async (req: Request, res: Response) => {
  const response = await usersAndPinsApi.createUser({
    userId: req.body.userId,
  });
  res
    .header("X-Request-Id", response.headers["x-request-id"])
    .send(response.data);
});

router.get("/users", async (req: Request, res: Response) => {
  const response = await usersAndPinsApi.listUsers(
    //@ts-ignore
    req.query.pinStatus,
    req.query.securityQuestionStatus,
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

router.get("/users/:id", async (req: Request, res: Response) => {
  const response = await usersAndPinsApi.getUser(req.params.id);
  res
    .header("X-Request-Id", response.headers["x-request-id"])
    .send(response.data);
});

router.get("/users/token", async (req: Request, res: Response) => {
  const response = await usersAndPinsApi.getUserToken(req.body.userId);
  res
    .header("X-Request-Id", response.headers["x-request-id"])
    .send(response.data);
});

router.get("/user", async (req: Request, res: Response) => {
  if (req.header("X-User-Token")) {
    const xUserToken: string = req.header("X-User-Token")!;
    const response = await usersAndPinsApi.getUserByToken(xUserToken);
    res
      .header("X-Request-Id", response.headers["x-request-id"])
      .send(response.data);
  } else {
    res.send("Please add an X-User-Token to the header");
  }
});

router.post("/user/initialize", async (req: Request, res: Response) => {
  if (req.header("X-User-Token")) {
    const xUserToken: string = req.header("X-User-Token")!;

    const response = await usersAndPinsApi.createUserWithPinChallenge(
      xUserToken,
      req.body
    );
    res
      .header("X-Request-Id", response.headers["x-request-id"])
      .send(response.data);
  } else {
    res.send("Please add an X-User-Token to the header");
  }
});

router.get("/user/challenges", async (req: Request, res: Response) => {
  if (req.header("X-User-Token")) {
    const xUserToken: string = req.header("X-User-Token")!;
    const response = await usersAndPinsApi.listUserChallenges(xUserToken);
    res
      .header("X-Request-Id", response.headers["x-request-id"])
      .send(response.data);
  } else {
    res.send("Please add an X-User-Token to the header");
  }
});

router.get("/user/challenges/:id", async (req: Request, res: Response) => {
  if (req.header("X-User-Token")) {
    const xUserToken: string = req.header("X-User-Token")!;
    const response = await usersAndPinsApi.getUserChallenge(
      xUserToken,
      req.params.id
    );
    res
      .header("X-Request-Id", response.headers["x-request-id"])
      .send(response.data);
  } else {
    res.send("Please add an X-User-Token to the header");
  }
});

router.post("/user/pin", async (req: Request, res: Response) => {
  if (req.header("X-User-Token")) {
    const xUserToken: string = req.header("X-User-Token")!;
    const response = await usersAndPinsApi.createUserPinChallenge(
      xUserToken,
      req.body
    );
    res
      .header("X-Request-Id", response.headers["x-request-id"])
      .send(response.data);
  } else {
    res.send("Please add an X-User-Token to the header");
  }
});

router.put("/user/pin", async (req: Request, res: Response) => {
  if (req.header("X-User-Token")) {
    const xUserToken: string = req.header("X-User-Token")!;
    const response = await usersAndPinsApi.updateUserPinChallenge(
      xUserToken,
      req.body
    );
    res
      .header("X-Request-Id", response.headers["x-request-id"])
      .send(response.data);
  } else {
    res.send("Please add an X-User-Token to the header");
  }
});

router.post("/user/pin/restore", async (req: Request, res: Response) => {
  if (req.header("X-User-Token")) {
    const xUserToken: string = req.header("X-User-Token")!;
    const response = await usersAndPinsApi.createUserPinRestoreChallenge(
      xUserToken,
      req.body
    );
    res
      .header("X-Request-Id", response.headers["x-request-id"])
      .send(response.data);
  } else {
    res.send("Please add an X-User-Token to the header");
  }
});

export default router;
