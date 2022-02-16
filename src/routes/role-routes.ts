import express from "express";
import {getRoles, getRole, createRole, deleteRole} from "../controllers/role-controller";


const roleRoutes = express.Router();

roleRoutes.get('/', getRoles);
roleRoutes.get('/:id', getRole);
roleRoutes.post('/', createRole);
roleRoutes.delete('/:id', deleteRole);

export default roleRoutes;