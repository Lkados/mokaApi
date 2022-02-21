import ApiError from '../error/api-error';
import {NextFunction, Request, Response} from 'express';
import { ObjectSchema } from 'yup';

function validateDto(schema: any){
    return async (req: Request, res: Response, next: NextFunction) => {
        try{
            
            const validatedBody = await schema.validate(req.body);
            
            next();
        }catch(err){
            next(ApiError.badRequest(err));
        }
    };
}

export = validateDto;