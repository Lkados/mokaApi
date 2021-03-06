"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var helmet_1 = __importDefault(require("helmet"));
var body_parser_1 = __importDefault(require("body-parser"));
var user_routes_1 = __importDefault(require("./routes/user-routes"));
var auth_routes_1 = __importDefault(require("./routes/auth_routes"));
var public_routes_1 = __importDefault(require("./routes/public_routes"));
var article_routes_1 = __importDefault(require("./routes/article-routes"));
var role_routes_1 = __importDefault(require("./routes/role-routes"));
var auth_checkers_1 = require("./middlewares/auth_checkers");
var category_routes_1 = __importDefault(require("./routes/category-routes"));
var api_error_handler_1 = __importDefault(require("./error/api-error-handler"));
//import categoryArticleRoutes from "./routes/categoryArticle-routes";
var cookieparser = require('cookie-parser');
var cors = require("cors");
var app = express_1.default();
app.use(cookieparser());
app.use(cors());
app.use(helmet_1.default());
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.use('/user', auth_checkers_1.checkAuth, user_routes_1.default);
app.use('/login', auth_routes_1.default);
app.use('/public', public_routes_1.default);
app.use('/article', article_routes_1.default);
app.use('/role', role_routes_1.default);
app.use('/category', category_routes_1.default);
// app.use('/categoryArticle', categoryArticleRoutes);
app.use(api_error_handler_1.default);
exports.default = app;
