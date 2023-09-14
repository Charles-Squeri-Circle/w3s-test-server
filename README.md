# w3s-test-server
This is still a work in progress.

## Setup
1. Install package dependencies. Run `npm install` in root of the repo.
2. Create a `.env` file in the root of the repo. 
3. In the `.env` set your API key `API_KEY="<API_KEY>"`. _If you do not have an API key please go to [Circle's Dev Console](https://developers.circle.com/) where you can get one._

4. In the `.env` add the base URL `BASE_URL="https://api.circle.com/v1/w3s"`
5. Start the development server `npm run start` !

Now you can send request to `http://localhost:3000/v1/w3s/*` and use the server as a proxy to for your client app.

Make sure to run the `npm install` in the root of the directory and `client/generated-sources/openapi`.

This repository is composed of 2 components
1. ExpressJs server `src/server/*`
2. Client SDK API libraries `src/client/*`

The Client SDK API generated sources were created from a resolved version of the  W3S.



## Internal Notes

### Generated Code
The generated code found in `~/src/client/generated` is from Circle's OAS found in [w3s-openapi-internal](https://github.com/circlefin/w3s-openapi-internal). More specifically it is using
```
npx @openapitools/openapi-generator-cli generate -g typescript-axios  \
-i ~/Developer/w3s-openapi-internal/dist/w3s.yaml \
-o ./src/client/generated/ \
-p npmName=circle,supportsES6=true,modelPropertyNaming=original,apiPackage=apis,modelPackage=models --additional-properties=withSeparateModelsAndApi=true
```
### Edits to OAS file
1. Consolidated OAS files into one 
2. Updated configuration URLs as they had duplicate `/v1/w3s/v1/w3s` because of baseURL change
3. Removed Security from each of the config urls