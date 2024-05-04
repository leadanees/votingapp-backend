import express from "express";
import dotenv from 'dotenv';
import mongoose from "mongoose";
import cors from 'cors';
import cookieParser from "cookie-parser";
import userRoute from "./routes/user.js";
import voterRoute from "./routes/voters.js";
import candidateRoute from "./routes/candidate.js";

//import bodyParser from 'body-parser'

dotenv.config();
const app = express();
const port = process.env.port || 8000 ;
const coreOption = {
    origin: true, 
    credentials: true
}

//database connection
mongoose.set('strictQuery',false);
const connection = async() =>{
    try{
        await mongoose.connect(process.env.MONGO_URI , {
            useNewUrlParser:true,
            useUnifiedTopology:true
        });
        console.log('connected db')
    }catch (ex){
        console.log("Mongodb failed connected "+ex)
    }
}


//for testing
app.get('/',(req,res,next)=>{
    res.send("api is working here");
    next();
})

//middleware
app.use(cors(coreOption));
app.use(express.json({limit:"20kb"}));//limit: it is use for less then or equal to 20kb files data
app.use(express.urlencoded({extended:true,limit:"20kb"}));
app.use(cookieParser());
app.use('/api/v1/users',userRoute);
app.use('/api/v1/voters',voterRoute);
app.use('/api/v1/candidates',candidateRoute);

app.listen(port,()=>{
    connection();
    console.log("server is listing at port number is ",port);
})