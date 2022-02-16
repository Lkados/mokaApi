import express from "express";
import {getArticles, getArticle, createArticle, deleteArticle, setCategory} from "../controllers/article-controller";


const articleRoutes = express.Router();

articleRoutes.get('/', getArticles);
articleRoutes.get('/:id', getArticle);
articleRoutes.post('/', createArticle);
articleRoutes.delete('/:id', deleteArticle);
articleRoutes.post('/setCategory', setCategory);

export default articleRoutes;