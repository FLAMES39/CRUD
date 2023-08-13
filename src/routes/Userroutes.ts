import { Router } from "express";
import { LoggedUser, RegisterUser, addUser, deleteUser, getallUser, getuserbyId, getuserbyemail, softDelete, updateUser } from "../Controlers/usercontroler";
import ejs from 'ejs'
import { verifyToken } from "../middlewares/verifytoken";

const userRoute= Router();



userRoute.post('',addUser)
userRoute.get('/user/:userid',getuserbyId)
userRoute.get('/:email',getuserbyemail)
userRoute.get('',getallUser)
userRoute.post('/:login',LoggedUser)
userRoute.put('/:userid',updateUser)
userRoute.delete('/delete/:userid',deleteUser)
userRoute.delete('/:userid',softDelete)
userRoute.post('/register/:register',RegisterUser)



export default userRoute;  