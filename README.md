# Simple Twitter Server

This is the backend of Simple Twitter project. This project is for educational purpose only.

## Our Stack
  * [Express](http://expressjs.com)
  * [Node.js](https://nodejs.org)
  * [MongoDB](https://www.mongodb.com)

## Pre Requirements
  1. [NodeJS](https://nodejs.org).
  2. [TypeScript](https://www.typescriptlang.org).
  3. [MongoDB](https://www.mongodb.com).

## Installation
  1. Install nodemon globally `npm i -g nodemon`.
  1. Install requirements with `npm install`.
  2. Run the server with `npm start`.
  3. Open your http client at [http://localhost:8080](http://localhost:8080).

**Configurations**

Create a `.env` file at the root directory (this file should not be commit).

Here is an example of the `.env` file:
```
MONGODB_URI=mongodb://localhost/simpleTwitter
JWT=SIMTWITT
PORT=4000
LOG_LEVEL=info
NODE_ENV=test
```

## Tests
  * Run `npm run tslint` to check for ESLint mistakes.
  * Run `npm test` to run the integration tests.
