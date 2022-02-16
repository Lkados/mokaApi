"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var categoryArticle_controller_1 = require("../controllers/categoryArticle-controller");
var categoryArticleRoutes = express_1.default.Router();
categoryArticleRoutes.get('/', categoryArticle_controller_1.getArticlesOfCategories);
categoryArticleRoutes.get('/:id', categoryArticle_controller_1.getArticlesOfCategory);
exports.default = categoryArticleRoutes;
