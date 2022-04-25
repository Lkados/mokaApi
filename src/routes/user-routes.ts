import express from "express";
import {login, getUsers, getUser, createUser, deleteUser, updateUserPassword} from "../controllers/user-controller";
import validateDto from "../middlewares/validate-dto";
import userDto from "../dto/user";

const userRoutes = express.Router();

userRoutes.get('/', getUsers);
userRoutes.get('/:id', getUser);
userRoutes.post('/', validateDto(userDto), createUser);
userRoutes.delete('/:id', deleteUser);
userRoutes.put('/', updateUserPassword);



export default userRoutes;

