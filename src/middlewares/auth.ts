import { User } from "../models/user.js";
import ErrorHandler from "../utils/utility-class.js";
import { TryCatch } from "./error.js";
import { Request, Response, NextFunction, RequestHandler } from 'express';

// middleware to make sure that only admin is allowed
// export const adminonly = TryCatch(
//     async(req: Request, res: Response, next: NextFunction) => {
//         const {id} = req.query;
        
//         if(!id) return next(new ErrorHandler(" Please login first",401));

//         const user = await User.findById(id);
//         if(!user) return next(new ErrorHandler(" Not valid ID",401));

//         if(user.role != "admin" )
//             return next(new ErrorHandler(" Please login with admin",401));
        
//         next();
        
//     }
// )

export const adminonly: RequestHandler = async (req, res, next) => {
    if (!req.user || !req.user.isAdmin) {
        res.status(403).send('Forbidden');
        return; // Ensure no further code is executed
    }
    next();
};