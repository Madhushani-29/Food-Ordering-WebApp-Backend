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
exports.jwtParse = exports.jwtCheck = void 0;
const express_oauth2_jwt_bearer_1 = require("express-oauth2-jwt-bearer");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_1 = __importDefault(require("../models/user"));
//focused on standard JWT validation based on configuration parameters
exports.jwtCheck = (0, express_oauth2_jwt_bearer_1.auth)({
    audience: process.env.AUTH0_AUDIENCE,
    issuerBaseURL: process.env.AUTH0_ISSUER_BASE_URL,
    tokenSigningAlg: "RS256",
});
const jwtParse = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    //extracts the authorization header from the request's headers
    const { authorization } = req.headers;
    if (!authorization || !authorization.startsWith("Bearer ")) {
        return res.sendStatus(401);
    }
    // Bearer lshdflshdjkhvjkshdjkvh34h5k3h54jkh
    const token = authorization.split(" ")[1];
    try {
        //decode the token and extract information from its payload
        //tells the TypeScript compiler to treat the result of jwt.decode(token) as a specific type, jwt.JwtPayload
        //this helps TypeScript understand the structure of the decoded object and provides type safety when accessing its properties.
        const decoded = jsonwebtoken_1.default.decode(token);
        //decoded is assumed to be an object representing the decoded payload of the JWT token
        //decoded.sub part accesses the sub claim within the decoded JWT payload
        const auth0ID = decoded.sub;
        //need to send the property name as in the data base
        //not id, ID since ID in the mongo
        const user = yield user_1.default.findOne({ auth0ID });
        if (!user) {
            console.error("User not found for auth0Id:", auth0ID);
            return res.sendStatus(401);
        }
        req.auth0ID = auth0ID;
        req.userID = user._id.toString();
        next();
    }
    catch (error) {
        return res.sendStatus(401);
    }
});
exports.jwtParse = jwtParse;
