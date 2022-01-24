"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var user_controller_1 = require("../controllers/user-controller");
var authRoutes = express_1.default.Router();
authRoutes.post('/', user_controller_1.login);
exports.default = authRoutes;
