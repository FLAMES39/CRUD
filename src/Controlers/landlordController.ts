import path from 'path'
import dotenv from 'dotenv'
import bcrypt from 'bcrypt'
import  jwt from 'jsonwebtoken'
import {v4 as uid} from 'uuid'
import { Request, Response } from 'express'
import { DatabaseHelper } from '../DatabaseHelper'
import { landLordSchema } from '../HELPERS/Validation'
dotenv.config({ path: path.resolve(__dirname, '../../.env') })


interface landlords{
    landLordid:number
    name:string
    email:string
    propertyDocs:string
    approved:number
    password:string
    role:string
    IsDeleded:number
    emailSent:number
    userid:number
    Ptopertyid:number
}




interface ExtendedRequest extends Request{
    body:{
        name:string
        email:string
        propertyDocs:string
        approved:number
        password:string
        IsDeleded:number
        emailSent:number
    },
    params:{
        email:string
        landLordid:string
    }
}



export const RegisterLandLord= async(req:ExtendedRequest,res:Response)=>{
    try {
        const landlordid=uid()
        const{name,email,password,propertyDocs}=req.body
        const {error}=landLordSchema.validate(req.body)
        
        
        if(error){
            return res.status(422).json(error.details[0].message)
        }
        const hashpassword= await bcrypt.hash(password,10)
        await DatabaseHelper.exec('RegisterLandLord',{email,name,password:hashpassword,propertyDocs})
        return res.status(201).json({message:"LandLord Registered...."})
    } catch (error:any) {
        return res.status(500).json({message:error.message})
    }
} 



export const loginLandlord = async(req:Request,res:Response)=>{
    try {
        const {email,password}=req.body
        let landLord= await (await DatabaseHelper.query(`SELECT * FROM LandLords WHERE email='${email}'`)).recordset
        // console.log(landLord);
        
        if(!landLord[0]){
            return res.status(404).json({message:"LandLord Not Found"})
        }
        let validpswd = await bcrypt.compare(password,landLord[0].password)
        if(!validpswd){
            return res.status(404).json({message:"LandLord Not Found"})
        }
        const payload= landLord.map(person=>{
            const{password,email,...rest}=person
            return rest
        })

        const token = jwt.sign(payload[0],process.env.SECRET_KEY as string, {expiresIn:"36000"})

        return res.status(201).json({message:"Successfull LoggedIN",token,name:payload[0].name,role:payload[0].role})
    } catch (error:any) {
        return res.status(500).json({mesage:error.mesage})
    }
}
export const GetallLandlords = async(req:ExtendedRequest,res:Response)=>{
try {
    let landlords:landlords[]=(await DatabaseHelper.exec('getLandlords')).recordset
    
    res.status(201).json(landlords)
} catch (error:any) {
    return res.status(500).json({message:error.message})
}
}

export const UpdateLandlord=async(req:ExtendedRequest,res:Response)=>{
    try {  
        const {name,email,propertyDocs,password}=req.body
        let hashpassword= await bcrypt.hash(password,10)
        const {landLordid}=req.params as {landLordid:string}
        const {error}= await landLordSchema.validate(req.body)
        if(error){
            return res.status(422).json(error.details[0].message)
        }
        let landlord:landlords= await(await DatabaseHelper.exec('sp_getLandlordById',{landLordid})).recordset[0]
        console.log(landLordid);
        
        if(!landlord){
            return res.status(404).json({message:"Landlord Not Found"})
        }
        await DatabaseHelper.exec('sp_updateLandlord ',{landLordid,name,password:hashpassword,email,propertyDocs})
        return res.status(201).json({message:"Landlord Updated Succesful"})
    } catch (error:any) {
        return res.status(500).json({message:error.message})
    }
}

export const DeleteLandlord= async (req:Request<{landLordid:string}>,res:Response)=>{
    try {
        const{landLordid}= req.params
        let landLord:landlords[]= await (await DatabaseHelper.exec('sp_getLandlordById', {landLordid})).recordset
        console.log(landLord);
        
        if(!landLord){
            return res.status(404).json({message:"Landlord Not Found"})
        }
        await DatabaseHelper.exec('DeleteLandLord',{landLordid})
        return res.status(201).json({message:"Landlord Deleted Successful"})
    } catch (error:any) {
        return res.status(500).json({message:error.message})

    }
}

export const GetLandlordById= async (req:Request<{landLordid: string}>,res:Response)=>{
    try {
        const {landLordid}= req.params
        let landlord:landlords= (await DatabaseHelper.exec('sp_getLandlordById',{landLordid})).recordset[0]
        if(landlord){
            return res.status(201).json(landlord)

        }
        return res.status(404).json({message:"Landlord Not Found"})

    } catch (error:any) {
        return res.status(500).json({message:error.message})

    }
}