import "dotenv/config";
import { v4 as uuidv4 } from "uuid";
import { DeveloperAccountApi } from "../../generated/apis/developer-account-api";
import { UsersAndPinsApi } from "../../generated/apis/users-and-pins-api";
import { WalletsApi } from "../../generated/apis/wallets-api";
import { CreateUserTokenChallengeId } from "../models/CreateUserTokenChallengeId";

const developerAccountApi = new DeveloperAccountApi({
  accessToken: process.env.API_KEY,
  isJsonMime: (mime: string) => mime.includes("json"),
});
const usersAndPinsApi = new UsersAndPinsApi({
  accessToken: process.env.API_KEY,
  isJsonMime: (mime: string) => mime.includes("json"),
});
const walletsApi = new WalletsApi({
  accessToken: process.env.API_KEY,
  isJsonMime: (mime: string) => mime.includes("json"),
});

export async function CreateUserTokenChallengeId() {
  try {
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

    const createUserTokenChallengeId: CreateUserTokenChallengeId = {
      data: {
        appId: getAppIdResponseData?.data?.appId,
        userToken: createUserTokenResponseData?.data?.userToken,
        encryptionKey: createUserTokenResponseData?.data?.encryptionKey,
        challengeId: initializeUserResponseData?.data?.challengeId,
      },
    };

    return createUserTokenChallengeId;
  } catch (error) {
    throw error
  } 
}

// 1. Acquire the APP ID
async function getAppId() {
  try {
    const response = await developerAccountApi.getEntityConfig();
    return response.data;
  } catch (error) {
    throw error;
  }
}

// 2. Create a User
async function createUser(userId: string) {
  try {
    await usersAndPinsApi.createUser({
      userId: userId,
    });
  } catch (error) {
    throw error;
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
    throw error;
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
    throw error;
  }
}

// 5. Create a Wallet in the Sample App

// 6. Check User Status
async function getUserStatus(userToken: string) {
  try {
    const response = await usersAndPinsApi.getUserByToken(userToken);
    return response.data;
  } catch (error) {
    throw error;
  }
}

// 7. Check Wallet Status
async function getUserWallets(userToken: string) {
  try {
    const response = await walletsApi.listWallets(userToken);
    return response.data;
  } catch (error) {
    throw error;
  }
}
