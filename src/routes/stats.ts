import express from 'express';
import { adminonly } from '../middlewares/auth.js';
import { getBarCharts, getDashboardStats, getLineCharts, getPieCharts } from '../controllers/stats.js';

const app = express.Router();

app.get("/stats", adminonly, async (req, res, next) => {
    try {
        const result = await getDashboardStats(req, res, next);
        res.json(result);
    } catch (error) {
        next(error);
    }
});

app.get("/pie", adminonly, async (req, res, next) => {
    try {
        await getPieCharts(req, res, next);
    } catch (error) {
        next(error);
    }
});

app.get("/bar", adminonly, async (req, res, next) => {
    try {
        await getBarCharts(req, res, next);
    } catch (error) {
        next(error);
    }
});

app.get("/line", adminonly, async (req, res, next) => {
    try {
        await getLineCharts(req, res, next);
    } catch (error) {
        next(error);
    }
});


export default app;