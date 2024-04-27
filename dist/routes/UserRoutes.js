"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const UserController_1 = __importDefault(require("../controller/UserController"));
const auth_1 = require("../middleware/auth");
const validation_1 = require("../middleware/validation");
const router = express_1.default.Router();
router.get("/", auth_1.jwtCheck, auth_1.jwtParse, UserController_1.default.getCurrentUser);
router.post("/", auth_1.jwtCheck, UserController_1.default.createCurrentUser);
router.put("/", auth_1.jwtCheck, auth_1.jwtParse, validation_1.validateMyUserRequest, UserController_1.default.updateCurrentUser);
exports.default = router;
