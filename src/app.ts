import express, {Express, Request, Response} from "express";
import helmet from "helmet";
import bodyParser from "body-parser";
import userRoutes from "./routes/user-routes";
import authRoutes from "./routes/auth";



const cors = require("cors");
const app: Express = express();

app.use(cors())
app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.use('/user', userRoutes);
app.use('/login', authRoutes)

export default app;