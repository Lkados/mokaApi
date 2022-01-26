const jwt = require('jsonwebtoken');
import {NextFunction, Request, Response} from 'express';

export function checkAuth(req: Request, res: Response, next: NextFunction){
    const token = req.cookies.token;
    console.log(token);
    if(!token){
        return res.status(401).json({
            message: 'No token provided'
        });
    }
    try{
        req.userData = jwt.verify(token, process.env.JWT_SECRET);

        next();
    }catch(error){
        return res.status(401).json({
            'message': "Invalid or expired token provided!",
            'error':error
        });
    }
}
