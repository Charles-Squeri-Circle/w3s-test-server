import express from "express";
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


(async () => {
  if (!process.env.ENTITY_SECRET) {
    const entitySecretCiphertext: string | undefined = await CreateEntitySecretCiphertext();
    console.log("If you intend to use developer-controlled wallets, register the following 684 character entity secret ciphertext on: https://console.circle.com/wallets/dev/configurator: \n\n" + entitySecretCiphertext + "\n\nYou can make a POST request to http://localhost:3000/v1/w3s/createEntitySecretCiphertext to retrieve this value again. \n");
  }
})();

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
