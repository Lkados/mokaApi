import express from "express";
import {getCategories, getCategory, createCategory, deleteCategory} from "../controllers/category-controller";
import validateDto from "../middlewares/validate-dto";
import categoryDto from "../dto/category";

const categoryRoutes = express.Router();

categoryRoutes.get('/', getCategories);
categoryRoutes.get('/:id', getCategory);
categoryRoutes.post('/', validateDto(categoryDto), createCategory);
categoryRoutes.delete('/:id', deleteCategory);


export default categoryRoutes;