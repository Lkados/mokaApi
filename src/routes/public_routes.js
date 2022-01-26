"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var public_controller_1 = require("../controllers/public_controller");
var publicRouter = express_1.default.Router();
publicRouter.get('/about', public_controller_1.getAbout);
publicRouter.get('/skilss', public_controller_1.getSkills);
publicRouter.get('/project', public_controller_1.getProjects);
exports.default = publicRouter;
