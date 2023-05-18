import express, { Application, Request, Response } from 'express';
import config from "config"
import * as mssql from 'mssql';


const app: Application = express();
app.use(express.json());

const dbport = config.get<string>("dbPort") //Add if needed with server as servername: dbport
const  serverName= config.get<string>("dbServer") 
const db: mssql.config = {
  user:  config.get<string>("dbUser") ,
  password: config.get<string>("dbPassword") ,
  server: `${serverName}` ,
  database: config.get<string>("databaseName")  ,
 pool: {
            max: 10,
            min: 0,
            idleTimeoutMillis: 30000
        },
        options: {
            encrypt: true, // for azure
            trustServerCertificate: true // change to true for local dev / self-signed certs
        }
};



export default db

//------------------------------------------------------------------------------
