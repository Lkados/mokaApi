"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var role_controller_1 = require("../controllers/role-controller");
var roleRoutes = express_1.default.Router();
roleRoutes.get('/', role_controller_1.getRoles);
roleRoutes.get('/:id', role_controller_1.getRole);
roleRoutes.post('/', role_controller_1.createRole);
roleRoutes.delete('/:id', role_controller_1.deleteRole);
exports.default = roleRoutes;
