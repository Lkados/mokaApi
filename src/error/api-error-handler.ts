import ApiError from './api-error';

import {NextFunction, Request, Response} from 'express';

function apiErrorHandler(err: any,req: Request, res: Response, next: NextFunction){
    console.error(err);

    if(err instanceof ApiError){
        return res.status(err.code).json(err.message);

    }

    return res.status(500).json('something went wrong');

}

export = apiErrorHandler;