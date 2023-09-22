import express from "express";
import fs from "fs";
import developerAccount from "./routes/developerAccount";
import userAndPins from "./routes/usersAndPins";
import wallets from "./routes/wallets";
import transactions from "./routes/transactions";
import tokenLookup from "./routes/tokenLookup";
import walletSets from "./routes/walletSets";
import deployImportContracts from "./routes/deployImportContracts";
import interactContracts from "./routes/interactContracts";
import viewUpdateContracts from "./routes/viewUpdateContracts";
import createUserTokenChallengeId from "./routes/createUserTokenChallengeId";
import createEntitySecretCiphertext from "./routes/createEntitySecretCiphertext";
import { CreateEntitySecretCiphertext } from "../client/custom/apis/createEntitySecretCiphertext";

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use("/v1/w3s/config/entity", developerAccount);
app.use("/v1/w3s", userAndPins);
app.use("/v1/w3s", wallets);
app.use("/v1/w3s", transactions);
app.use("/v1/w3s", tokenLookup);
app.use("/v1/w3s", walletSets);
app.use("/v1/w3s", deployImportContracts);
app.use("/v1/w3s", interactContracts);
app.use("/v1/w3s", viewUpdateContracts);
app.use("/v1/w3s", createUserTokenChallengeId);
app.use("/v1/w3s", createEntitySecretCiphertext);

// Starts express server, checks setup, and initializes entity secret.
(async () => {
  try {
    await fs.promises.access(".env", fs.constants.F_OK);
  } catch (error) {
    console.log("SETUP ERROR: The .env file doesn't exist. Please create it and add your API key: API_KEY=\"<API_KEY>\"\n\nTo acquire an API key go to https://console.circle.com\n");
    process.exit(1);
  }

  if (!process.env.API_KEY) {
    console.log("SETUP ERROR: The API_KEY environment variable doesn't exist. Please add it to the .env file: API_KEY=\"<API_KEY>\"\n\nTo acquire an API key go to https://console.circle.com\n");
    process.exit(1);
  }

  if (!process.env.ENTITY_SECRET) {
    try {
      const entitySecretCiphertext: string | undefined =
        await CreateEntitySecretCiphertext();
      console.log(
        "If you intend to use developer-controlled wallets, register the following 684 character entity secret ciphertext on: https://console.circle.com/wallets/dev/configurator \n\n" +
          entitySecretCiphertext +
          "\n\nTo retrieve this value again, make a POST request to http://localhost:3000/v1/w3s/createEntitySecretCiphertext\n"
      );
    } catch (error) {
      console.error(error);
    }
  }

  app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
  });
})();
