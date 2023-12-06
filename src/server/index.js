import express from "express";
import cors from "cors";
import fs from "fs";
import developerAccount from "./routes/developerAccount.js";
import userAndPins from "./routes/usersAndPins.js";
import wallets from "./routes/wallets.js";
import transactions from "./routes/transactions.js";
import tokenLookup from "./routes/tokenLookup.js";
import walletSets from "./routes/walletSets.js";
import deployImportContracts from "./routes/deployImportContracts.js";
import interactContracts from "./routes/interactContracts.js";
import viewUpdateContracts from "./routes/viewUpdateContracts.js";
// import createUserTokenChallengeId from "./routes/createUserTokenChallengeId.js";
import signing from "./routes/signing.js";
import templates from "./routes/templates.js";
// import createEntitySecretCiphertext from "./routes/createEntitySecretCiphertext.js";
// import { createEntitySecretCiphertext as initEntitySecretCiphertext  } from "../client/custom/apis/createEntitySecretCiphertext.js";


const port = process.env.PORT || 3000;

const app = express();
app.use(express.json());
app.use(cors()); 
app.use("/v1/w3s/config/entity", developerAccount);
app.use("/v1/w3s", userAndPins);
app.use("/v1/w3s", wallets);
app.use("/v1/w3s", transactions);
app.use("/v1/w3s", tokenLookup);
app.use("/v1/w3s", walletSets);
app.use("/v1/w3s", deployImportContracts);
app.use("/v1/w3s", interactContracts);
app.use("/v1/w3s", viewUpdateContracts);
// app.use("/v1/w3s", createUserTokenChallengeId);
app.use("/v1/w3s", signing);
app.use("/v1/w3s", templates);
// app.use("/v1/w3s", createEntitySecretCiphertext);

// Starts express server, checks setup, and initializes entity secret.
(async () => {
  // try {
  //   await fs.promises.access(".env", fs.constants.F_OK);
  // } catch (error) {
  //   console.log("SETUP ERROR: The .env file doesn't exist. Please create it and add your API key: API_KEY=\"<API_KEY>\"\n\nTo acquire an API key go to https://console.circle.com\n");
  //   process.exit(1);
  // }

  // if (!process.env.API_KEY) {
  //   console.log("SETUP ERROR: The API_KEY environment variable doesn't exist. Please add it to the .env file: API_KEY=\"<API_KEY>\"\n\nTo acquire an API key go to https://console.circle.com\n");
  //   process.exit(1);
  // }

  // if (!process.env.ENTITY_SECRET) {
  //   try {
  //     const entitySecretCiphertext =
  //       await initEntitySecretCiphertext();
  //     console.log(
  //       "If you intend to use developer-controlled wallets, register the following 684 character entity secret ciphertext on: https://console.circle.com/wallets/dev/configurator \n\n" +
  //         entitySecretCiphertext +
  //         "\n\nTo retrieve this value again, make a POST request to http://localhost:3000/v1/w3s/createEntitySecretCiphertext\n"
  //     );
  //   } catch (error) {
  //     console.error(error);
  //   }
  // }

  app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
  });
})();
