//This is used to get the access token from Header. Validate it. 
//And if it is valid, we will attach the user to res.locals.user 

import { Request,Response,NextFunction } from "express";
import { verifyJwt } from "../utils/jwt";


const deserializeUser = async ( req: Request,res: Response,next : NextFunction ) => {
    const accessToken = (req.headers.authorization || "").replace(/^Bearer\s/,"")


    if(!accessToken){
        return next()
    }
    const decoded = verifyJwt(accessToken,"accessTokenPublicKey")

    if (decoded){
        res.locals.user = decoded
        console.log("\nPRINTING DECODED JWT FROM HEADER : \n ",decoded)
    }
    return next()
   }

   export default deserializeUser