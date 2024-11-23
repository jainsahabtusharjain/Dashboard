import express from 'express';
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

export default app;