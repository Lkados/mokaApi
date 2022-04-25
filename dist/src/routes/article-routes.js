"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var article_controller_1 = require("../controllers/article-controller");
var validate_dto_1 = __importDefault(require("../middlewares/validate-dto"));
var article_1 = __importDefault(require("../dto/article"));
var articleRoutes = express_1.default.Router();
articleRoutes.get('/', article_controller_1.getArticles);
articleRoutes.get('/:id', article_controller_1.getArticle);
articleRoutes.post('/', validate_dto_1.default(article_1.default), article_controller_1.createArticle);
articleRoutes.delete('/:id', article_controller_1.deleteArticle);
articleRoutes.put("/:id", article_controller_1.updateArticle);
//articleRoutes.post('/setCategory', setCategory);
exports.default = articleRoutes;
