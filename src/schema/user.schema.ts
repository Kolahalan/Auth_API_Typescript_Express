//We are using this schema to validate our Request when a User is to be created

import {object,string,TypeOf} from "zod"

export const createUserSchema = object({
    body: object({
        firstName: string({
            required_error: "firstName is required" 
        }),
         lastName: string({
            required_error: "lastName is required"
        }),
         password: string({
            required_error: "password is required"
        }).min(6,"Password is too short. Need atleast 6 charecters"),
        passwordConfirmation: string ({
            required_error:"passwordConfirmation is required"
        }),
        email:string({
            required_error: "email is required"
        }).email("Not a valid email"),
}).refine((data)=>data.password === data.passwordConfirmation,{ //This checks if password and passwordConfirmation fields match
    message: "Passwords do not match", //If they dont match, It throws and error with a path pointing to that field
    path: ["passwordConfirmation"]
})
})

export const verifyUserSchema = object({
    params: object({
        id:string(),
        verificationCode:string()
    })
})

export const forgotPasswordSchema = object({
    body: object({
        email: string ({
            required_error: "Email is required"
        }).email("Not a valid email address") //If the user sends a invalid email, it is caught in the middleware before getting into the database
    })
})

export const resetPasswordSchema = object({
    params: object({
        id: string({
            required_error: "id is Required"
        }),
        passwordResetCode: string({
            required_error: "Password Reset Code mandatory"
        })
    }),
    body: object({
        password: string({
            required_error: "Password is required"
        }),
        passwordConfirmation: string({
            required_error: "Password Confirmation is required"
        })
    }).refine((data)=>data.password === data.passwordConfirmation,{
    message: "Passwords do not match",
    path: ["passwordConfirmation"]
})
})

//These exports give a typeScript Interface from the schema that we created

export type CreateUserInput = TypeOf<typeof createUserSchema>["body"]

export type VerifyUserInput = TypeOf<typeof verifyUserSchema>["params"]

export type ForgotPasswordInput = TypeOf<typeof forgotPasswordSchema>["body"]

export type ResetPasswordInput = TypeOf<typeof resetPasswordSchema>
