"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var category_controller_1 = require("../controllers/category-controller");
var validate_dto_1 = __importDefault(require("../middlewares/validate-dto"));
var category_1 = __importDefault(require("../dto/category"));
var categoryRoutes = express_1.default.Router();
categoryRoutes.get('/', category_controller_1.getCategories);
categoryRoutes.get('/:id', category_controller_1.getCategory);
categoryRoutes.post('/', validate_dto_1.default(category_1.default), category_controller_1.createCategory);
categoryRoutes.delete('/:id', category_controller_1.deleteCategory);
exports.default = categoryRoutes;
