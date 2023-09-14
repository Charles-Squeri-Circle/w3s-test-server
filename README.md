# w3s-test-server
This ReadMe file is a work in progress.

## Setup
1. Install package dependencies. Run `npm install` in root of the repo.
2. Install package dependencies within `src/client/generated/` running npm install here as well.
3. Create a `.env` file in the root of the repo. 
4. In the `.env` set your API key `API_KEY="<API_KEY>"`. _If you do not have an API key please go to [Circle's Dev Console](https://developers.circle.com/) where you can get one._
5. In the `.env` add the base URL `BASE_URL="https://api.circle.com/v1/w3s"`
6. Start the development server `npm run start` !

Now you can send request to `http://localhost:3000/v1/w3s/*` and use the server as a proxy to for your client app.
## Internal Notes

### Generated Code
The code found in `src/client/generated` is generated from Circle's OAS found in [w3s-openapi-internal](https://github.com/circlefin/w3s-openapi-internal) using the `src/client/generated/w3s-openapi.yaml` file. More specifically using the following command
```
npx @openapitools/openapi-generator-cli generate -g typescript-axios  \
-i src/client/generated/w3s-openapi.yaml \
-o src/client/generated/ \
-p npmName=circle,supportsES6=true,modelPropertyNaming=original,apiPackage=apis,modelPackage=models --additional-properties=withSeparateModelsAndApi=true
```
### Edits to OAS file
1. Consolidated OAS files into one aggregate.
2. Updated `/config` APIs paths. There were duplicates of `/v1/w3s` because of baseURL change.