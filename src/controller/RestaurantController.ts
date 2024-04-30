import { Request, Response } from "express";
import User from "../models/user";

const createRestaurant = async (req: Request, res: Response) => {
  try {
    /* const { auth0ID } = req.body;
    const existingUser = await User.findOne({ auth0ID });

    if (existingUser) {
      return res.status(200).json({ message: "User already exists" }).send();
    }

    const newUser = new User(req.body);
    await newUser.save();
    res.status(201).json(newUser.toObject());*/

    res.json({message:"Restaurant Created !"});
    
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error creating user" });
  }
};

export default { createRestaurant };
