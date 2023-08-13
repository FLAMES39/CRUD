import express, { Express, json } from "express";
import cors from 'cors'
import userRoute from "./routes/Userroutes";
import propertyroute from "./routes/propertyRoutes";
import landlordRoute from "./routes/landlordRoutes";



const SERVER = express();
const PORT = 4000;

SERVER.use(cors())//allows two prts to communicate
SERVER.use(json()),//Middleware

SERVER.use('/user',userRoute),
SERVER.use('/property', propertyroute ),
SERVER.use('/landlord', landlordRoute)





SERVER.listen(PORT, ()=>{
    console.log(`Database connected to http://localhost:${PORT} `);
    
})
