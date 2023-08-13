import path from 'path'
import dotenv from 'dotenv'
import { Request, Response } from 'express'
import { v4 as uid } from 'uuid'
import { DatabaseHelper } from '../DatabaseHelper'
import { propertySchema } from '../HELPERS/Validation'
dotenv.config({ path: path.resolve(__dirname, '../../.env') })


interface property {
    Propertyid: number
    name: string
    type: string
    location: string
    address: string
    city: string
    price: number
    imageUrl: string
    country: string
    userid: number
    IsDeleted: number
}
interface ExtendedRequest extends Request {
    body: {
        name: string
        type: string
        location: string
        address: string
        price: number
        imageUrl: string
        city: string
        country: string
        userid: number
    }
    params: {
        Propertyid: string

    }
}




export const getProperties = async (req: ExtendedRequest, res: Response) => {
    try {
        let property: property[] = await (await DatabaseHelper.exec('getProperties')).recordset
        return res.status(201).json(property)
    } catch (error: any) {
        return res.status(500).json({ message: error.message })
    }
}
export const addProperty = async (req: ExtendedRequest, res: Response) => {
    try {
        const Propertyid = uid()
        const { name, type, location, address, city, price, imageUrl, country } = req.body
        const { error } = propertySchema.validate(req.body)
        if (error) {
            return res.status(401).json(error.details[0].message)
        }

        // console.log(name);

        await DatabaseHelper.exec('sp_insertProperty', { name, type, location, address, city, price, imageUrl, country })


        return res.status(201).json({ message: "Property Added Successful!!" })
    } catch (error: any) {
        return res.status(500).json({ message: error.massage })
    }
}

export const GetPropertyById = async (req: Request<{ Propertyid: string }>, res: Response) => {
    try {
        const { Propertyid } = req.params as { Propertyid: string }
        console.log(Propertyid);

        let property: property = await (await DatabaseHelper.exec('sp_getPropertyById', {Propertyid})).recordset[0]
        console.log(property);

        if (property) {
            return res.status(201).json(property)

        }
        return res.status(404).json({ message: "Property Not Found" })

    } catch (error: any) {
        return res.status(500).json({ message: error.massage })

    }
}

export const UpdateProperty=async(req:ExtendedRequest,res:Response)=>{
    try {
       
        const {name,type,location, address,city,price,imageUrl,country}=req.body
        const {Propertyid}=req.params as {Propertyid:string}
        const {error}= await propertySchema.validate(req.body)
        if(error){
            return res.status(422).json(error.details[0].message)
        }
        let property:property= await(await DatabaseHelper.exec('sp_getPropertyById',{Propertyid})).recordset[0]        
        if(!property){
            return res.status(404).json({message:"Property Not Found"})
        }
        await DatabaseHelper.exec('sp_updateProperty ',{Propertyid,name,type,location, address,city,price,imageUrl,country})
        return res.status(201).json({message:"Property Updated Succesful"})
    } catch (error:any) {
        return res.status(500).json({message:error.message})
    }
}


export const DeleteProperty = async( req:Request<{Propertyid:string}>,res:Response)=>{
    try {
        const {Propertyid}=req.params
        let property:property= (await DatabaseHelper.exec('sp_getPropertyById',{Propertyid})).recordset[0]
        if(!property){
            return res.status(404).json({message:"Property Does Not Exist"})
        }
        await DatabaseHelper.exec('sp_deleteProperty',{Propertyid})
        return res.status(201).json({message:"Property Deleted Permanently Successful"})
    } catch (error:any) {
        return res.status(500).json({message:error.message})

    }
}