
import { Request,Response } from "express";
import * as mssql from 'mssql';
import db from "../utils/connectToMssql"
import log from "../utils/logger";
import { CreateEmployeeInput, DeleteEmployeeInput, EditEmployeeInput, ReadSingleEmployeeInput } from "../schema/employee.schema";
import { createEmployeeRecord, deleteEmployeeRecord, editEmployeeRecord, readAllEmployeeRecord, readEmployeeRecord } from "../service/employee.service";

//Create
export async function createEmployeeHandler(req:Request<{},{},CreateEmployeeInput>, res:Response) {
try {
    console.log(db)
    const result = await createEmployeeRecord(req.body)
    if(result.rowsAffected[0] > 0){
       return res.json({status: "Created a new Employee"});
    }
    res.json(result) 
  } catch (err: any) {
    res.status(500).send(err.message);
  }
}

//Read a single row
export async function readEmployeeHandler(req:Request<ReadSingleEmployeeInput>, res:Response) {
try {
    const result = await readEmployeeRecord(req.params)
    res.json(result.recordset);
  } catch (err: any) {
    res.status(500).send(err.message);
  }
}

//Read all rows
export async function readAllEmployeeHandler(req:Request, res:Response) {
  try {
    const result = await readAllEmployeeRecord()
    res.json(result.recordset);
  } catch (err: any) {
    res.status(500).send(err.message);
  }
}

//Update
export async function editEmployeeHandler(req:Request<EditEmployeeInput["params"],{},EditEmployeeInput["body"]>, res:Response) {
 try {
   const result = await editEmployeeRecord(req.params,req.body)
    if(result.rowsAffected[0] > 0){
       return res.json({status: "Edit successfull"});
    }else if (result.rowsAffected[0] === 0) {
return res.json({status: "id doesnt exist in Table. Enter a valid id"});
    }
    res.json(result);
  } catch (err: any) {
    res.status(500).send(err.message);
  }
}

//Delete
export async function deleteEmployeehandler(req:Request<DeleteEmployeeInput>, res:Response) {
try {
    const result = await deleteEmployeeRecord(req.params)
     if(result.rowsAffected[0] > 0){
       return res.json({status: "Delete successfull"});
    } else if (result.rowsAffected[0] === 0) {
return res.json({status: "id doesnt exist in Table. Enter a valid id"});
    }
    res.json(result);
     } catch (err: any) {
    res.status(500).send(err.message);
  }
}

