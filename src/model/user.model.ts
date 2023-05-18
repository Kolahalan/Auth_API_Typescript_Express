import { getModelForClass, prop,modelOptions, Severity, pre ,DocumentType, index} from "@typegoose/typegoose"
import { nanoid } from "nanoid"
import argon2 from "argon2" //Similar library like bcrypt
import log from "../utils/logger"

export const privateFields = [
    "password",
    "__v",
    "verificationCode",
    "passwordResetCode",
    "verified"
] //We use this to omit our private fields from being displayed to the user

@pre<User>("save", async function(){ //We run this pre method to ensure that password is not directly put in our database. Instead it is hashed by argon2
if(!this.isModified("password")){
    return
}
const hash = await argon2.hash(this.password)
this.password = hash
return 
})

@index({email: 1}) //We are indexing the email field as it increases the speed of our search when we search for a Document with the user's email in this collection

@modelOptions({ //Typegoose function that gives us additional options regarding our Documents in this 'collection'
    schemaOptions:{
        timestamps:true //We want to add a createdAt and updatedAt fields for our MongoDb documents
    },
    options:{
        allowMixed : Severity.ALLOW 
        //We are setting this as we want our passwordResetCode to be string | null. As when someone resets their password, we want to set this field to be set to null
    }
})

export class User {
    /*  In tsconfig.json By default    "experimentalDecorators": false will be default
    change it to  "experimentalDecorators": true. Else it will throw a error at prop
    */

    @prop({lowercase:true,required:true,unique:true}) //These are constraints for the Document that are going to be inserted in MongoDB through TypeGoose
    email:string /* in tsconfig.json set "strictPropertyInitialization": false, Else this will throw an error */ 

    @prop({required:true})
    firstName: string

    @prop({required:true})
    lastName: string

    @prop({required:true, default: () => nanoid()}) //For dynamically gfenerating a UUID
    verificationCode: string

    @prop({ required: true })
    password: string;

    @prop()
    passwordResetCode: string | null /*passwordResetCode to be string | null. As when someone resets their password, we want this field to be set to null 
    As we dont want them to keep using the old password reset code*/
 
    @prop({default: false}) //Once user registers an account, this will be false. When they verify their email, this will be changed to true through another Update service
    verified:boolean

    /* We use this method to check whether the user's password matched with the hashed password 
    stored in MongoDB*/
    async validatePassword(this: DocumentType<User>,candidatePassword:string) {
        try{
            return await argon2.verify(this.password,candidatePassword)
        }catch(e:any){
            log.error(e, "Could not validate password")
        }
    }
}

const UserModel = getModelForClass(User) //Typegoose function

export default UserModel
