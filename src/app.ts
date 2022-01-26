import express, {Express, Request, Response} from "express";
import helmet from "helmet";
import bodyParser from "body-parser";
import userRoutes from "./routes/user-routes";
import authRoutes from "./routes/auth_routes";
import {checkAuth} from "./middlewares/auth_checkers";
import public_routes from "./routes/public_routes";

const cookieparser = require('cookie-parser');
const cors = require("cors");
const app: Express = express();
app.use(cookieparser());
app.use(cors())
app.use(helmet());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.use('/user',checkAuth ,userRoutes);
app.use('/login', authRoutes)
app.use('/public', public_routes);

export default app;