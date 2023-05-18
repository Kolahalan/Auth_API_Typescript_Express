import { Request, Response } from "express-serve-static-core";
import { CreateUserInput, ForgotPasswordInput, ResetPasswordInput, VerifyUserInput } from "../schema/user.schema";
import { createUser, findUserByEmail, findUserById } from '../service/user.service';
import sendEmail from "../utils/mailer";
import log from "../utils/logger"
import { nanoid } from "nanoid";

export async function createUserHandler(req: Request<{},{},CreateUserInput>,res: Response){
const body = req.body

try {
    const user =  await createUser(body)
   await sendEmail({
    from: "test@example.com", //Enter the email that you wish to send mails from
    to:user.email,
    subject: "Please verify your email",
    text:`verification code ${user.verificationCode}. Id: ${user._id} `,
   })
    return res.send("User successfully created")

    }catch(e:any){

        if(e.code == 11000){ //This is sent  when the unique email field in createUserschema is violated. ie User tries to create a existing user with registered email

            // set  "emitDecoratorMetadata": true, in tsconfig.json to bypass the error - Error: "User.email"'s Type is invalid! Type is: "undefined" [E009]
            return res.status(409).send("Account Already exists")
        }
        return res.status(500).send(e)
    }
}


export async function verifyUserHandler(req: Request<VerifyUserInput>, res: Response) {

  try {
    const id = req.params.id;
    const verificationCode = req.params.verificationCode;

    // find the user by id
    const user = await findUserById(id);

    if (!user) {
      return res.send("Could not verify User");
    }

    // check to see if they are already verified
    if (user.verified) {
      return res.send("User is already verified");
    }

    // check if the verification code matches
    if (user.verificationCode === verificationCode) {
      user.verified = true;
      await user.save();

      return res.send("User successfully verified");
    }
    return res.send("Could not verify User");

  } catch (error:any) {
    if (error.name === "CastError") {
      return res.send("Invalid ID format").status(400);
    }
    return res.send("Invalid Input. Unable to change").status(404)
  }
}


export async function forgotPasswordHandler(req:Request<{},{},ForgotPasswordInput>,res:Response){
const {email} = req.body

const message = "if a user is registered with that email, you will receive a password reset email"
/*This message is a bit misleading but we intentionally put it to prevent malicious users to spam this end point 
with different emails to test whether they are registered
*/

const user = await findUserByEmail(email)

if (!user){
    log.debug(`User with email ${email} does not exist`)
    return res.send(message)
}

if (!user.verified){
    res.send("User is not verified")
}
 const passwordResetCode = nanoid() //To generate a random string for password reset
 user.passwordResetCode = passwordResetCode
 await user.save() //We are saving the passwordResetCode in the corresponding Document of the user

 await sendEmail({
    from: "test@example.com", //Enter the email that you wish to send mails from
    to:user.email,
    subject: "Reset your Password",
    text:`Password reset code : ${passwordResetCode}. Id: ${user._id} `, //You can put in some nice HTML code here to render beautifully on the user's mail
   })

   log.debug(`password reset email sent to ${user.email}`)
   res.send(message);

}

export async function resetPasswordHandler(req:Request<ResetPasswordInput["params"],{},ResetPasswordInput["body"]>,res:Response){
try{
  const {id,passwordResetCode} = req.params

const {password} = req.body

const user = await findUserById(id); //We ensure that the user for the given id exists in our DB

if (!user || !user.passwordResetCode || user.passwordResetCode !== passwordResetCode ) { //User should exits in Dww[-=]
  return res.status(400).send("Could not reset password")
}
user.passwordResetCode = null
user.password = password

await user.save(); 

return res.send("Saved Password Successfully")

}catch (error:any) {
    if (error.name === "CastError") {
      return res.send("Invalid ID format");
    }
    throw error;
  }
}

export async function getCurrentUserHandler(req:Request,res:Response){
  return res.send(res.locals.user)
}