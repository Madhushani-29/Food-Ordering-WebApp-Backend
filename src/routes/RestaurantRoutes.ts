import express from "express";
import UserController from "../controller/UserController";
import { jwtCheck, jwtParse } from "../middleware/auth";
import { validateMyUserRequest } from "../middleware/validation";
import { Request, Response } from "express";

const router = express.Router();

router.post("/", async (req: Request, res: Response)=>{
    res.json({message:"Restaurant Created !"});
});

export default router;
