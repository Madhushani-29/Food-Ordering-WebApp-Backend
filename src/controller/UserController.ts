import { Request, Response } from "express";
import User from "../models/user";

const createCurrentUser = async (req: Request, res: Response) => {
  // 1- check the user availability
  // 2- create user if it is not created
  // 3- send the created user as a response
  try {
    const { auth0ID } = req.body;
    const existingUser = await User.findOne({ auth0ID });

    if (existingUser) {
      // Send a 200 OK response and terminate the function
      return res.status(200).json({ message: "User already exists" }).send();
    }

    // Creating a new user object with the request body
    const newUser = new User(req.body);
    // Saving the new user to the database
    await newUser.save();
    // Send a 201 Created response with the newly created user object
    res.status(201).json(newUser.toObject());
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error creating user" });
  }
};

export default {
  createCurrentUser,
};
