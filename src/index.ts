import express, {Request, Response} from "express";
import cors from "cors";
import "dotenv/config";
import connectDB from "./config/dbConnection";

//create app
const app=express();

const port=process.env.PORT||3001;

connectDB();

app.use(express.json());
app.use(cors());

app.get('/test', (req:Request, res:Response)=>{
    res.json({message:"Endpoint accessed successfully !"});
});

app.listen(port, ()=>{
    console.log(`Server running on port ${port}`);
})