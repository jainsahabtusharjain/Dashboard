import multer from 'multer';
import { v4 as uuid } from 'uuid';

// Define the storage configuration for multer
const storage = multer.diskStorage({
    // Specify the destination for file uploads
    destination(req: Express.Request, file: Express.Multer.File, callback: (error: Error | null, destination: string) => void) {
        callback(null, "uploads");
    },
    // Specify the filename for uploaded files
    filename(req: Express.Request, file: Express.Multer.File, callback: (error: Error | null, filename: string) => void) {
        const id = uuid();
        const extname = file.originalname.split(".").pop();
        
        callback(null, `${id}.${extname}`);
    },
});

// Export the single upload middleware
export const singleupload = multer({ storage }).single("photo");