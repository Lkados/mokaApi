"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var helmet_1 = __importDefault(require("helmet"));
var body_parser_1 = __importDefault(require("body-parser"));
var user_routes_1 = __importDefault(require("./routes/user-routes"));
var auth_1 = __importDefault(require("./routes/auth"));
var cors = require("cors");
var app = express_1.default();
app.use(cors());
app.use(helmet_1.default());
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.use('/user', user_routes_1.default);
app.use('/login', auth_1.default);
exports.default = app;
