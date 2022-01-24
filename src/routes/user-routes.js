"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var user_controller_1 = require("../controllers/user-controller");
var userRoutes = express_1.default.Router();
userRoutes.get('/', user_controller_1.getUsers);
userRoutes.get('/:id', user_controller_1.getUser);
userRoutes.post('/', user_controller_1.createUser);
userRoutes.put('/', user_controller_1.getUsers);
userRoutes.delete('/', user_controller_1.getUsers);
exports.default = userRoutes;
