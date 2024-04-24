import express from "express";
import UserController from "../controller/UserController";
import { jwtCheck } from "../middleware/auth";

const router = express.Router();

router.post("/", jwtCheck, UserController.createCurrentUser);

export default router;
