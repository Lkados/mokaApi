import express from "express";
import {login, getUsers, getUser, createUser, deleteUser} from "../controllers/user-controller";
import validateDto from "../middlewares/validate-dto";
import userDto from "../dto/user";

const userRoutes = express.Router();

userRoutes.get('/login', login);
userRoutes.get('/', getUsers);
userRoutes.get('/:id', getUser);
userRoutes.post('/', validateDto(userDto), createUser);
userRoutes.put('/', getUsers);
userRoutes.delete('/:id', deleteUser);


export default userRoutes;

