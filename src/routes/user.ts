import express, { NextFunction } from 'express';
import { deleteUser, getAllUsers, getUser, newUser } from '../controllers/user.js';
import { adminonly } from '../middlewares/auth.js';

const app = express.Router();

app.post("/new", async (req, res, next) => {
    try {
        await newUser(req, res, next);
    } catch (error) {
        next(error);
    }
});

app.get("/all", adminonly, async (req, res, next) => {
    try {
        await getAllUsers(req, res, next);
    } catch (error) {
        next(error);
    }
});

app.route("/:id")
    .get(async (req, res, next) => {
        try {
            await getUser(req, res, next);
        } catch (error) {
            next(error);
        }
    })
    .delete(async (req, res, next) => {
        try {
            await adminonly(req, res, next);
            await deleteUser(req, res, next);
            res.status(204).send();
        } catch (error) {
            next(error);
        }
    });

app.get("/line", adminonly, async (req: express.Request, res: express.Response, next: NextFunction) => {
    try {
        // Your logic here (e.g., fetching data)
        const data = await someAsyncFunction(); // Replace with your actual logic

        // Send the response back to the client
        res.json(data); // This sends the data as a JSON response
    } catch (error) {
        // If an error occurs, pass it to the next middleware
        next(error);
    }
});

export default app;

function someAsyncFunction() {
    throw new Error('Function not implemented.');
}
