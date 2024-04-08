import express, {Request, Response} from "express";
import cors from "cors";
import "dotenv/config";

//create app
const app=express();
app.use(express.json());
app.use(cors());

app.get('/test', (req:Request, res:Response)=>{
    res.json({message:"Endpoint accessed successfully !"});
});

const port=process.env.PORT;
app.listen(port, ()=>{
    console.log(`Server running on port ${port}`);
})