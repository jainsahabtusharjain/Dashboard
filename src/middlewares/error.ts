import { Request, Response, NextFunction } from 'express';

export const errorMiddleware = (err: any, req: Request, res: Response, next: NextFunction) => {
    // Handle the error
    console.error(err); // Log the error for debugging
    res.status(500).json({ message: 'Internal Server Error' }); // Send a generic error response
};

export const TryCatch = (fn: (req: Request, res: Response, next: NextFunction) => Promise<void>) => {
    return (req: Request, res: Response, next: NextFunction) => {
        Promise.resolve(fn(req, res, next)).catch(next);
    };
};