import express from 'express';
import {getAbout, getSkills, getProjects} from "../controllers/public_controller";

const publicRouter = express.Router();

publicRouter.get('/about',getAbout);
publicRouter.get('/skilss', getSkills);
publicRouter.get('/project',getProjects);

export default publicRouter;
