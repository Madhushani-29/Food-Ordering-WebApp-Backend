"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_1 = __importDefault(require("../models/user"));
const getCurrentUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield user_1.default.findById(req.userID);
        if (!user) {
            return res.status(404).json({ message: "User not found" }).send();
        }
        res.status(200).json(user);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error finding the user" });
    }
});
const createCurrentUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // 1- check the user availability
    // 2- create user if it is not created
    // 3- send the created user as a response
    try {
        const { auth0ID } = req.body;
        const existingUser = yield user_1.default.findOne({ auth0ID });
        if (existingUser) {
            // Send a 200 OK response and terminate the function
            return res.status(200).json({ message: "User already exists" }).send();
        }
        // Creating a new user object with the request body
        const newUser = new user_1.default(req.body);
        // Saving the new user to the database
        yield newUser.save();
        // Send a 201 Created response with the newly created user object
        res.status(201).json(newUser.toObject());
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error creating user" });
    }
});
const updateCurrentUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield user_1.default.findById(req.userID);
        if (!user) {
            return res.status(404).json({ message: "User not found" }).send();
        }
        const updatedUser = yield user_1.default.findByIdAndUpdate(user._id, req.body, {
            new: true,
        });
        res.status(201).json(updatedUser);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error updating user" });
    }
});
exports.default = {
    getCurrentUser,
    createCurrentUser,
    updateCurrentUser,
};
