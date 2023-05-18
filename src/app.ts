require("dotenv").config()
import express from "express"
import config from "config"
import connectToMongoDb from "./utils/connectToMongoDb"
import log from "./utils/logger"
import routes from "./routes/index"
import deserializeUser from "./middleware/deserializeUser"

const app = express()

app.use(express.json()) //this is needed to parse body. Previously we used body-Parser. Now we have upgraded to this express.json() 

app.use(deserializeUser) //To retrive accessToken from header if it is present
app.use(routes)

const port = config.get<string>("port")

app.listen(port,()=>{
   log.info(`Server runs at http://localhost:${port}`)
    connectToMongoDb()
})
