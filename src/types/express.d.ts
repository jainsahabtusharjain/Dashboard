import { Request } from 'express';

declare global {
    namespace Express {
        interface Request {
            user?: {
                isAdmin: boolean; // Add other user properties as needed
                // e.g., id: string;
                // e.g., name: string;
            };
        }
    }
}
