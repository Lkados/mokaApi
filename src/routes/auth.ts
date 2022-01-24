import express from "express";
import {login} from '../controllers/user-controller';

const authRoutes = express.Router();

authRoutes.post('/', login);


export default authRoutes;