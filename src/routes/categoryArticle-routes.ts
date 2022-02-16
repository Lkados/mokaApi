import express from "express";
import {getArticlesOfCategory, getArticlesOfCategories} from "../controllers/categoryArticle-controller";


const categoryArticleRoutes = express.Router();


categoryArticleRoutes.get('/', getArticlesOfCategories)
categoryArticleRoutes.get('/:id', getArticlesOfCategory);


export default categoryArticleRoutes;