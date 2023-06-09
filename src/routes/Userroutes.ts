import { Router } from "express";
import { LoggedUser, addUser, getallUser, getuserbyemail } from "../Controlers/usercontroler";
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

userRoute.post('',verifyToken,addUser)
userRoute.get('/one',getuserbyemail)
userRoute.get('/all',getallUser)
userRoute.post('/login',LoggedUser)


export default userRoute;  