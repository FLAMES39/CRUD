import express, { Express, json } from "express";
import cors from 'cors'
import userRoute from "./routes/Userroutes";



const SERVER = express();
const PORT = 4000;

SERVER.use(cors())
SERVER.use(json()),

SERVER.use('/user',userRoute)





SERVER.listen(PORT, ()=>{
    console.log(`Database connected to http://localhost:${PORT} `);
    
})
