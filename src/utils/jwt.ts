import jwt from "jsonwebtoken"

import config from "config"

export function signJwt(object: Object, keyName: "accessTokenPrivateKey" | "refreshTokenPrivateKey",options?:jwt.SignOptions | undefined){
const signingKey = Buffer.from(config.get<string>(keyName),"base64").toString("ascii")
/* Our Keys are base64 encoded. Hence we decode those keys into ascii*/ 

/* ...(options && options) means we spread the options if we have any, passedinto this function */
return jwt.sign(object, signingKey,{
    ...(options && options),
    algorithm: "RS256",
})
}

export function verifyJwt<T>(token: string, keyName:"accessTokenPublicKey" | "refreshTokenPublicKey") : T | null {
const publicKey = Buffer.from(config.get<string>(keyName),"base64").toString("ascii")
/* Our Keys are base64 encoded. Hence we decode those keys into ascii in publicKey variable*/ 

try {
 const decoded = jwt.verify(token,publicKey) as T
 return decoded
}catch(e:any){
    return null
}

}