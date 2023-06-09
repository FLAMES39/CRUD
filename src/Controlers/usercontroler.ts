import mssql from 'mssql'
import { Express, Request, Response } from 'express'
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

}


export const addUser = async (req: ExtendedRequest, res: Response) => {
    try {
        const { error } = validationSchema.validate(req.body)
        if (error) {
            return res.status(404).json(error.details[0].message)
        }
        let user = uid()
        const { name, password, email, role } = req.body
        console.log(user);

        let hashpassword = await bcrypt.hash(password, 10)

        await DatabaseHelper.exec('sp_insertUser', { name, password: hashpassword, email, role })

        return res.status(201).json({ message: "successfull Added"})
    } catch (error: any) {
        return res.status(500).json(error.message)
    }
}

export const getuserbyemail = async (req: Request<{ email: string }>, res: Response) => {
    try {
        const { email } = req.params
        console.log(email);
        const user = (await DatabaseHelper.exec('getallUserByEmail',{email})).recordset[0];
        if (user) {
            return res.status(200).json({message:user})
        }
        return res.status(404).json({message:"user not found"})
    } catch (error: any) {
        return res.status(500).json({message:error.message})
    }
}

export const LoggedUser = async (req: Request, res: Response) => {
    try {

        const { email, password } = req.body
        let user:iusers[] = await (await DatabaseHelper.exec('authenticateUsers', { password, email })).recordset


        if (!user[0]) {
            return res.status(404).json({ message: "user not found " })
        }

        let validPsw = await bcrypt.compare(password, user[0].password)
        if (!validPsw) {
            return res.status(401).json({ message: "user not found " })
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

export const getallUser = async (req: ExtendedRequest, res: Response) => {
    try {
        let user: iusers[] = await (await DatabaseHelper.exec('getallUser')).recordset
        res.status(200).json(user)
    }
    catch (error: any) {
        return res.status(500).json(error.message)
    }
}