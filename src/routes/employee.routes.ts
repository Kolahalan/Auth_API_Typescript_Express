import express, {Request,Response} from "express"
import validateResource from "../middleware/validateResorce";
import { createEmployeeSchema } from "../schema/employee.schema";
import { createEmployeeHandler, deleteEmployeehandler, editEmployeeHandler, readAllEmployeeHandler, readEmployeeHandler } from "../controller/employee.controller";

const router = express.Router()

// Create a new record
router.post('/api/records',validateResource(createEmployeeSchema),createEmployeeHandler);

// Read all records
router.get('/api/records',readAllEmployeeHandler);

// Read a specific record
router.get('/api/records/:id', readEmployeeHandler);

// Update a specific record
router.put('/api/records/:id', editEmployeeHandler);

// Delete a specific record
router.delete('/api/records/:id',deleteEmployeehandler);

  export default router