## Installation

```bash
$ npm install
```

## Setting up Environment

Copy the contents of the '.env.sample' file to the '.env' file and add in your own API KEY, SECRET and CLIENT ID

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## API

The endpoint for the API is -

```bash
localhost:5001/postcode/:postcode
```

The postcode you want to query must be passed as a path parameter in the API endpoint.

The response will be a string of Comma Seperated Values.
