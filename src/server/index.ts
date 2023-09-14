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
import createUserTokenInitialize from "./routes/createUserTokenInitialize";

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
app.use("/v1/w3s/createUserTokenInitialize", createUserTokenInitialize);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
