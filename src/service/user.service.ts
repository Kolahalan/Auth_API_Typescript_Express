import UserModel,{User} from "../model/user.model"

export function createUser(input: Partial<User>) { //Partial comes from typeScript which means we will select any property from the given interface User
return UserModel.create(input)
}

export function findUserById(id: string){

    return UserModel.findById(id)
}

export function findUserByEmail(email: string){

    return UserModel.findOne({email})
    
    /*UserModel.findOne({email}).lean() 
    In the above example, if we use .lean, we would get just a corresponding JSON model.
    But when we use UserModel.findOne({email}), 
    we are returned a UserModel which we can use to do DB operations 
    such as .save() etc
    */

}