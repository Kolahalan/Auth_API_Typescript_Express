import { Ref, getModelForClass, prop } from "@typegoose/typegoose";
import { User } from "./user.model";

export class Session {
    @prop({ref:()=> User}) //ref is a function that returns the User class
    user: Ref<User> //The property Ref comes from Typegoose

    @prop({default:true}) //If the user logs out, We need to change this session to false
    valid:boolean
}

const SessionModel = getModelForClass(Session, { 
    schemaOptions: {
        timestamps:true
    }
})

/* getModelForClass(Session,{       //This is an alternate way of adding timestamps to MongoDB documents in typegoose than @modeloptiona
    schemaOptions: {
        timestamps:true
    }
})
    
*/

export default SessionModel 