import "dotenv/config";
import { v4 as uuidv4 } from "uuid";
import { DeveloperAccountApi } from "../../generated/apis/developer-account-api";
import { UsersAndPinsApi } from "../../generated/apis/users-and-pins-api";
import { WalletsApi } from "../../generated/apis/wallets-api";
import { CreateUserTokenInitialize } from "../models/createUserTokenInitialize";

const developerAccountApi = new DeveloperAccountApi(
  {
    accessToken: process.env.API_KEY,
    isJsonMime: (mime: string) => mime.includes("json"),
  },
  process.env.BASE_URL
);

const usersAndPinsApi = new UsersAndPinsApi(
  {
    accessToken: process.env.API_KEY,
    isJsonMime: (mime: string) => mime.includes("json"),
  },
  process.env.BASE_URL
);
const walletsApi = new WalletsApi(
  {
    accessToken: process.env.API_KEY,
    isJsonMime: (mime: string) => mime.includes("json"),
  },
  process.env.BASE_URL
);

export async function CreateUserTokenInitialize() {
  const getAppIdResponseData = await getAppId();

  const userId = uuidv4();
  await createUser(userId);

  const createUserTokenResponseData = await createUserToken(userId);

  let initializeUserResponseData;
  if (createUserTokenResponseData && createUserTokenResponseData.data) {
    initializeUserResponseData = await initializeUser(
      createUserTokenResponseData?.data?.userToken
    );
  }

  const createUserTokenInitialize: CreateUserTokenInitialize = {
    data: {
      appId: getAppIdResponseData?.data?.appId,
      userToken: createUserTokenResponseData?.data?.userToken,
      encryptionKey: createUserTokenResponseData?.data?.encryptionKey,
      challengeId: initializeUserResponseData?.data?.challengeId,
    },
  };

  return createUserTokenInitialize;
}

async function getAppId() {
  try {
    const response = await developerAccountApi.getEntityConfig();
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

// 2. Create a User
async function createUser(userId: string) {
  try {
    await usersAndPinsApi.createUser({
      userId: userId,
    });
  } catch (error) {
    console.error(error);
  }
}

// 3. Acquire a Session Token
async function createUserToken(userId: string) {
  try {
    const response = await usersAndPinsApi.getUserToken({
      userId: userId,
    });
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

// 4. Initialize the User's Account and Acquire the Challenge ID
async function initializeUser(userToken: string) {
  try {
    const response = await usersAndPinsApi.createUserWithPinChallenge(
      userToken,
      {
        idempotencyKey: uuidv4(),
        blockchains: ["ETH-GOERLI"],
      }
    );
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

// 5. Create a Wallet in the Sample App

// 6. Check User Status
async function getUserStatus(userToken: string) {
  try {
    const response = await usersAndPinsApi.getUserByToken(userToken);
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

// 7. Check Wallet Status
async function getUserWallets(userToken: string) {
  try {
    const response = await walletsApi.listWallets(userToken);
    return response.data;
  } catch (error) {
    console.error(error);
  }
}