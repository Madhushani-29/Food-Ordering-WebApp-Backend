import express from "express";
import RestaurantController from "../controller/RestaurantController";
import { jwtCheck, jwtParse } from "../middleware/auth";
import { validateMyUserRequest } from "../middleware/validation";
import { Request, Response } from "express";

const router = express.Router();

router.post("/", RestaurantController.createRestaurant);

export default router;
