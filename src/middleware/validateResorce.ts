//We use validateResource to ensure that the request from user matches our createuserSchema 

import { Request,Response,NextFunction } from "express";
import { AnyZodObject } from "zod";

const validateResource = (schema:AnyZodObject) => (req: Request,res: Response,next: NextFunction) => { 
    //We will call validateResource with our schema
    
try {
    schema.parse({
        body: req.body,
        query:req.query,
        params: req.params
    })
    next(); //If schema can be parsed from request, Then the request received is good to go down the chain. Else throw an error
}catch(e:any){
    return res.status(400).send(e.errors)
}
}

export default validateResource

// TFP-PSI - Reference

// TFP-Platform