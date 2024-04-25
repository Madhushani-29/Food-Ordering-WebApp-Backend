import express from "express";
import UserController from "../controller/UserController";
import { jwtCheck, jwtParse } from "../middleware/auth";

const router = express.Router();

router.post("/", jwtCheck, UserController.createCurrentUser);
router.put("/", jwtParse, UserController.updateCurrentUser);

export default router;
