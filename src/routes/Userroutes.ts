import { Router } from "express";
import { LoggedUser, addUser, deleteUser, getallUser, getuserbyId, getuserbyemail, updateUser } from "../Controlers/usercontroler";
import ejs from 'ejs'
import { verifyToken } from "../middlewares/verifytoken";

const userRoute= Router();

// userRoute.post('/user', (req,res) =>{
//     res.render('index.ejs')
// })

// userRoute.post('/login', (req,res) =>{
//     res.render('login.ejs')
// })
// userRoute.post('/register', (req,res) =>{
//     res.render('registration.ejs')
// })

userRoute.post('',addUser)
userRoute.get('/user/:userid',getuserbyId)
userRoute.get('/:email',getuserbyemail)
userRoute.get('',getallUser)
userRoute.post('/:login',LoggedUser)
userRoute.put('/update/:userid',updateUser)
userRoute.delete('/delete/:userid',deleteUser)



export default userRoute;  