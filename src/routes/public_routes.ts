import express from 'express';
import {getAbout} from "../controllers/public_controller";

const publicRouter = express.Router();

publicRouter.get('/about',getAbout);

export default publicRouter;
