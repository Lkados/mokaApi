"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkAuth = void 0;
var jwt = require('jsonwebtoken');
function checkAuth(req, res, next) {
    var token = req.cookies.token;
    console.log(token);
    if (!token) {
        return res.status(401).json({
            message: 'No token provided'
        });
    }
    try {
        req.userData = jwt.verify(token, process.env.JWT_SECRET);
        next();
    }
    catch (error) {
        return res.status(401).json({
            'message': "Invalid or expired token provided!",
            'error': error
        });
    }
}
exports.checkAuth = checkAuth;
