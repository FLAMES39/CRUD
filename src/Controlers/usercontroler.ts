import mssql from 'mssql'
import { Express, Request, RequestHandler, Response } from 'express'
import { sqlConfig } from '../config'
import bcrypt from 'bcrypt'
import { validationSchema } from '../HELPERS/Validation'
import ejs from 'ejs'

import path from 'path'
import dotenv from 'dotenv'
import jwt from 'jsonwebtoken'
import { v4 as uid } from 'uuid'
import { DatabaseHelper } from '../DatabaseHelper'

//config setting for the dotenv file
dotenv.config({ path: path.resolve(__dirname, '../../.env') })

interface iusers {
    userid: string
    name: string,
    password: string,
    email: string,
    role: string
}
interface ExtendedRequest extends Request {
    body: {
        userid: string
        name: string,
        password: string,
        email: string,
        role: string
    }
    params:{
        userid:string,
        email:string
    }
}


export const addUser = async (req: ExtendedRequest, res: Response) => {
    try {
        const { error } = validationSchema.validate(req.body)
        if (error) {
            return res.status(404).json(error.details[0].message)
        }
        let id= uid()
        const {  userid, name, password, email, role } = req.body
        // console.log(userid);

        let hashpassword = await bcrypt.hash(password, 10)

        await DatabaseHelper.exec('sp_insertUser', {  userid, name, password: hashpassword, email, role })

        return res.status(201).json({ message: "successfull Added" ,})
    } catch (error: any) {
        return res.status(500).json(error.message)
    }
}

export const getuserbyemail = async (req: Request<{ email: string }>, res: Response) => {
    try {
        const { email } = req.params as {email:string}
        console.log(email);
        const user:iusers= (await DatabaseHelper.exec('getallUserByEmail',{email:email})).recordset[0];
        console.log(user);
        
        if (user) {
            return res.status(200).json(user)
        }
        return res.status(404).json({message:"user not found"})
    } catch (error: any) {
        return res.status(500).json({message:error.message})
    }
}

export const getuserbyId = async (req: Request<{ userid: string }>, res: Response) => {
    try {
        const { userid } = req.params as { userid:string}
        console.log(userid);
        const user:iusers=(await DatabaseHelper.exec('sp_getuserById',{userid})).recordset[0];
        console.log(user);
        
        if (user) {
            return res.status(200).json(user)
        }
        return res.status(404).json({message:"user not found"})
    } catch (error: any) {
        return res.status(500).json({message:error.message})
    }
}



export const LoggedUser = async (req: Request, res: Response) => {
    try {

        const { email, password} = req.body
        let user= await (await DatabaseHelper.query(`SELECT * FROM Users WHERE email='${email}'`)).recordset
        console.log(user);
        console.log(password);
        console.log(email);
        
        
        if (!user[0]) {
            return res.status(404).json({ message: "user not found" })
        }
        let validPsw = await bcrypt.compare(password, user[0].password)
        console.log(validPsw);
        
        if (!validPsw) {
            return res.status(401).json({ message: "incorrect password" })
        }
        const payload = user.map(person => {
            const { password, email, ...rest } = person
            return rest
        })
        //token
        const token = jwt.sign(payload[0], process.env.SECRET_KEY as string, { expiresIn: '36000' })
        return res.status(201).json({ message: "logged in successfull", token })

    } catch (error: any) {
        return res.status(500).json(error.message)
    }
}

export const getallUser= async  ( req:ExtendedRequest,res:Response ) => {
    try {
        let user: iusers[] = await (await DatabaseHelper.exec('getallUser')).recordset
        // console.log(user);
        
        res.status(200).json(user)
    }
    catch (error: any) {
        return res.status(500).json(error.message)
    }
}

export const deleteUser=async (req:Request <{userid:string}>,res:Response)=>{
try {
    const {userid}=req.params as {userid:string}
    let user:iusers=await (await DatabaseHelper.exec('sp_getuserById', { userid })).recordset[0]
    // console.log(userid);
    
    if (!user){
        return res.status(404).json( {message:"User not found"} )
    }
    await DatabaseHelper.exec('sp_deleteUser',{userid})
    console.log();
    
    return res.status(201).json({message:"Deleted Successfull"})
} catch (error:any) {
    return res.status(500).json(error.message)
}
}
export const updateUser = async(req:ExtendedRequest,res:Response)=>{
    try {
        const {userid,name,password,email,role}=req.body
        let user:iusers=await (await DatabaseHelper.exec('sp_getuserById', { userid })).recordset[0]
        // console.log(userid);
        
        if(!user){
            return res.status(404).json({message:"User not found"})
        }
        await DatabaseHelper.exec("sp_updateUser",{ userid, name, password, email, role })
        return res.status(201).json({message:"User Updated"})
    } catch (error:any) {
        return res.status(500).json(error.message)
    }
}