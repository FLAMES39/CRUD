import { NextFunction, Request, Response } from "express";
import path from 'path'
import dotenv from 'dotenv'
import jwt from 'jsonwebtoken'
dotenv.config({path:path.resolve(__dirname,'../../.env') })

interface DecodedData{
    Userid:string,
    name:string,
    role:string
}
interface ExtendedRequest extends Request{
    info?:DecodedData
}

export const verifyToken=(req:ExtendedRequest,res:Response,next:NextFunction)=>{
    try {
        //Read the token from the request
        const token= req.headers['token'] as string
        if(!token){  
            return res.status(401).json({message:"Unathorised"})
        }
        //if token is available we verify it now by checking if the token is valid if the it has expired 
        const decodedData= jwt.verify(token,process.env.SECRET_KEY as string) as DecodedData
        req.info=decodedData
        return res.status(201).json({massage:token})
    } catch (error:any) {
        return res.status(403).json({message:error.message})
    }
    next()
}
