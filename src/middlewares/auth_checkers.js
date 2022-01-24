"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var jwt = require('jsonwebtoken');
function checkAuth(req, res, next) {
    var token = req.headers.authorization;
    if (!token) {
        return res.status(401).json({
            message: 'No token provided'
        });
    }
    try {
        var decodedToken = jwt.verify(token, process.env.JWT_KEY);
        req.userData = decodedToken;
        next();
    }
    catch (error) {
        return res.status(401).json({
            'message': "Invalid or expired token provided!",
            'error': error
        });
    }
}
