/*
We are using this schema to validate our Request when a Employee is to be created
in Records table in 'test' Database of mssql server 
*/
import {object,string,TypeOf} from "zod"

export const createEmployeeSchema = object({
    body: object({
      name: string({
        required_error: "name is required"
      }),
      age: string({
        required_error: "age is required"
      }),
      gender: string({
        required_error: "gender is required"
      })
    })
})

export const editEmployeeSchema = object({
     params: object({
        id:string()
    }),
    body: object({
      name: string(),
      age: string(),
      gender: string()
    })
})

export const deleteEmployeeSchema = object({
     params: object({
        id:string()
    })
})



export type CreateEmployeeInput = TypeOf<typeof createEmployeeSchema>["body"]

export type EditEmployeeInput = TypeOf<typeof editEmployeeSchema>

export type DeleteEmployeeInput = TypeOf<typeof deleteEmployeeSchema>["params"]

export type ReadSingleEmployeeInput = TypeOf<typeof deleteEmployeeSchema>["params"]
