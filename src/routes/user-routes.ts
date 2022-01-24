import express from "express";
import {getUsers, getUser, createUser} from "../controllers/user-controller";


const userRoutes = express.Router();

userRoutes.get('/', getUsers);
userRoutes.get('/:id', getUser);
userRoutes.post('/', createUser);
userRoutes.put('/', getUsers);
userRoutes.delete('/', getUsers);

export default userRoutes;