import express from "express";
import {getRoles, getRole, createRole, deleteRole} from "../controllers/role-controller";
import validateDto from "../middlewares/validate-dto";
import roleDto from "../dto/role";

const roleRoutes = express.Router();

roleRoutes.get('/', getRoles);
roleRoutes.get('/:id', getRole);
roleRoutes.post('/', validateDto(roleDto), createRole);
roleRoutes.delete('/:id', deleteRole);

export default roleRoutes;