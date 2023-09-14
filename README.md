# Web3 Services Test Server

<h4 align="center">Accelerate Integration to Circle's Web3 Services (W3S) APIs with Our Test Server</h4>

Our Test Server, built with Node.js and Typescript using the Express.js framework, offers simple routing for developers looking to seamlessly connect their client app with Circle's W3S APIs.

**Initial Setup Steps:**
1. Install package dependencies
```
npm install
```
2. Create a `.env` file and add your API key.  
   * _NOTE: You can go to [Circle's Dev Console](https://developers.circle.com/) to acquire an API key if you do not already have one._
```
API_KEY="<API_KEY>"
```
3. Start the test server
```
npm run start
```
4. Send your first API request!
```
curl --location 'http://localhost:3000/v1/w3s/wallets'
```

## Additional Helper Functions
| Function | Description |
| --- | --- |
| `createUserTokenInitialize.ts` | Provides all the values needed to create your first user controlled wallet. |

## Additional Notes

### Generated Code
The code found in `src/client/generated` is generated from Circle's OpenAPI Specification (OAS) using the `src/client/generated/w3s-openapi.yaml` file. This was done using the [openapi-generator-cli](https://openapi-generator.tech) and the [typescript-axios generator](https://openapi-generator.tech/docs/generators/typescript-axios/).

To reproduce the generated code you can run the following command.
```
npx @openapitools/openapi-generator-cli generate -g typescript-axios  \
-i src/client/generated/w3s-openapi.yaml \
-o src/client/generated/ \
-p npmName=circle,supportsES6=true,modelPropertyNaming=original,apiPackage=apis,modelPackage=models --additional-properties=withSeparateModelsAndApi=true
```
### Edits to OAS file
1. Consolidated OAS files into one aggregate.
2. Updated `/config` APIs paths. There were duplicates of `/v1/w3s` because of baseURL change.