import { CreateEmployeeInput, DeleteEmployeeInput, EditEmployeeInput, ReadSingleEmployeeInput } from "../schema/employee.schema";
import * as mssql from 'mssql';
import db from "../utils/connectToMssql"

export async function createEmployeeRecord(input:CreateEmployeeInput){
const pool: mssql.ConnectionPool = await mssql.connect(db);
    const { name, age, gender } = input;
    const result: mssql.IResult<any> = await pool.request()
      .input('name', mssql.NVarChar, name)
      .input('age', mssql.Int, age)
      .input('gender', mssql.NVarChar, gender)
      .query('INSERT INTO Records (Name, Age, Gender) VALUES (@name, @age, @gender)');
  return  result
}

export async function readEmployeeRecord(input:ReadSingleEmployeeInput){
    const pool: mssql.ConnectionPool = await mssql.connect(db);
    const { id } = input;
    const result: mssql.IResult<any> = await pool.request()
      .input('id', mssql.Int, id)
      .query('SELECT * FROM Records WHERE Id = @id');
 return result      
}

export async function readAllEmployeeRecord(){
     const pool: mssql.ConnectionPool = await mssql.connect(db);
    const result: mssql.IResult<any> = await pool.request().query('SELECT * FROM Records');
    return result
}

export async function editEmployeeRecord(params:EditEmployeeInput["params"],input:EditEmployeeInput["body"]) {
 const pool: mssql.ConnectionPool = await mssql.connect(db);
    const { id } = params;
    const { name, age, gender } = input;
    const result: mssql.IResult<any> = await pool.request()
      .input('id', mssql.Int, id)
      .input('name', mssql.NVarChar, name)
      .input('age', mssql.Int, age)
      .input('gender', mssql.NVarChar, gender)
      .query('UPDATE Records SET Name = @name, Age = @age, Gender = @gender WHERE Id = @id');

      return result
    }

    export async function deleteEmployeeRecord(input:DeleteEmployeeInput){
    const pool: mssql.ConnectionPool = await mssql.connect(db);
    const { id } = input;
    const result: mssql.IResult<any> = await pool.request()
      .input('id', mssql.Int, id)
      .query('DELETE FROM Records WHERE Id = @id');

      return result
    }