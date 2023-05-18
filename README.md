# REST API using Typescript, ExpressJS, NodeJS, MongoDB, and MSSQL

## Initial Setup

To begin setting up the project, follow these steps:

1. Initialize the npm package:

npm --init

2. Initialize Typescript:

tsc --init

3. Install the required dependencies:

npm install --save express mssql mongoose @typegoose/typegoose config argon2 pino dayjs nanoid nodemailer lodash jsonwebtoken dotenv zod

4. Install the required dev dependencies:

npm install --save-dev typescript ts-node-dev @types/express @types/config pino-pretty @types/nodemailer @types/lodash @types/jsonwebtoken

5. Change the scripts in package.json to the following:

"scripts": {
"dev": "ts-node-dev --respawn --transpile-only src/app.ts"
}

6. To start the Typescript server, run the following command in the terminal:

npm run dev

7. To test the API using Postman, Open Postman and import the JSON file 'Auth API.postman_collection.json' and the environment from the JSON file 'AUTH API.postman_environment.json' located in the root directory.

## Routes - Using MongoDB

The following routes use MongoDB as the primary DB to store data from the following routes:

- Register a user
- Verify user's email address
- Send forgot password email
- Reset password
- Get current user
- Login

## Routes - Using MSSQL Server

The following routes use MSSQL database as the primary DB to store data from the following routes.

- Create Employee
- Read Employee By ID
- Edit Employee By ID
- Delete Employee By ID

## Auth Routes

- Access token
- Refresh tokens

## Dependencies

The following dependencies are used:

- TypeScript: Static type checking
- Express: Web server
- Typegoose: Mongoose wrapper for creating TypeScript interfaces and models
- argon2: Password hashing
- Zod: Validation
- jsonwebtoken: Signing and verifying JSON web tokens
- Nodemailer: Sending emails
- Pino: Logging
- config: Managing configuration

## Create an .env File and Add the Following variables

ACCESS_TOKEN_PRIVATE_KEY =
ACCESS_TOKEN_PUBLIC_KEY =

REFRESH_PRIVATE_KEY =
REFRESH_PUBLIC_KEY =

#Private and Public Keys are base64 encoded

DB_SERVER=
DB_PORT=
DB_USER=
DB_PASSWORD=

## POSTMAN Collection JSON

Go to POSTMAN and import the following files

Auth API.postman_collection - This file consists of the req body that we send in from our client to test our routes in the server.
AUTH API.postman_environment - Consists of environment variables used in postman collection
