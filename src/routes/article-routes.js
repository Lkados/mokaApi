"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var article_controller_1 = require("../controllers/article-controller");
var articleRoutes = express_1.default.Router();
articleRoutes.get('/', article_controller_1.getArticles);
articleRoutes.get('/:id', article_controller_1.getArticle);
articleRoutes.post('/', article_controller_1.createArticle);
articleRoutes.delete('/:id', article_controller_1.deleteArticle);
articleRoutes.post('/setCategory', article_controller_1.setCategory);
exports.default = articleRoutes;
