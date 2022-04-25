import express from "express";
import {getArticles, getArticle, createArticle, deleteArticle, updateArticle} from "../controllers/article-controller";
import validateDto from "../middlewares/validate-dto";
import articleDto from "../dto/article";

const articleRoutes = express.Router();

articleRoutes.get('/', getArticles);
articleRoutes.get('/:id', getArticle);
articleRoutes.post('/', validateDto(articleDto), createArticle);
articleRoutes.delete('/:id', deleteArticle);
articleRoutes.put("/:id", updateArticle);
//articleRoutes.post('/setCategory', setCategory);

export default articleRoutes;