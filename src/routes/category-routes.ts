import express from "express";
import {getCategories, getCategory, createCategory, deleteCategory} from "../controllers/category-controller";


const categoryRoutes = express.Router();

categoryRoutes.get('/', getCategories);
categoryRoutes.get('/:id', getCategory);
categoryRoutes.post('/', createCategory);
categoryRoutes.delete('/:id', deleteCategory);


export default categoryRoutes;