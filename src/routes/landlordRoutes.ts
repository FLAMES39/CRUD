import { Router } from "express";
import { DeleteLandlord, GetLandlordById, GetallLandlords, RegisterLandLord, UpdateLandlord, loginLandlord } from "../Controlers/landlordController";






const landlordRoute= Router();

landlordRoute.post('/Register/:Register',RegisterLandLord)
landlordRoute.post('/login',loginLandlord)
landlordRoute.get('',GetallLandlords)
landlordRoute.put('/:landLordid',UpdateLandlord)
landlordRoute.get("/:landLordid", GetLandlordById)
landlordRoute.delete('/:landLordid',DeleteLandlord)




export  default landlordRoute