"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var user_controller_1 = require("../controllers/user-controller");
var validate_dto_1 = __importDefault(require("../middlewares/validate-dto"));
var user_1 = __importDefault(require("../dto/user"));
var userRoutes = express_1.default.Router();
userRoutes.get('/', user_controller_1.getUsers);
userRoutes.get('/:id', user_controller_1.getUser);
userRoutes.post('/', validate_dto_1.default(user_1.default), user_controller_1.createUser);
userRoutes.delete('/:id', user_controller_1.deleteUser);
userRoutes.put('/', user_controller_1.updateUserPassword);
exports.default = userRoutes;
