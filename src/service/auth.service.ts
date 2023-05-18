import {DocumentType} from "@typegoose/typegoose"
import { User, privateFields } from "../model/user.model";
import { signJwt } from "../utils/jwt";
import SessionModel from "../model/session.model";
import {omit} from "lodash"


export async function createSession({userId}:{userId:string}){
return SessionModel.create({user: userId})
}

export async function signRefreshToken({ userId }: { userId: string }) {
  const session = await createSession({
    userId,
  });

  const refreshToken = signJwt(
    {
      session: session._id,
    },
    "refreshTokenPrivateKey",
    {
      expiresIn: "1y",
    }
  );

  return refreshToken;
}


export function signAccessToken(user: DocumentType<User>){
    const payload = omit(user.toJSON(),privateFields) 
  /*  We are converting the user to plain JSON Object with user.toJSON().
      Omit Syntax - omit( object to be processed , fields to be omitted from it ) 
      We use this functionality from lodash to omit certain fields from the user 
      containing all the fields from the corresponding MongoDB document 
      "privateFields", refers to the array in user.model file that was exported.
      It corresponds to a set of fields that should be protected
      and not be sent to the user 
  */

/* The final payload, consists of data with omitted fields 
   which can be sent as a payload for a JWT token to be signed over it 
*/

  const accessToken = signJwt(payload, "accessTokenPrivateKey", {
    expiresIn: "15m",
  });

  return accessToken;
}

export async function findSessionById(id : string){
return SessionModel.findById(id)
}