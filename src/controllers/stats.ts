import { Request, Response, NextFunction } from "express";
import { Order } from "../models/order.js";
import ErrorHandler from "../utils/utility-class.js";

const asyncHandler = (fn: (req: Request, res: Response, next: NextFunction) => Promise<void>) => {
    return (req: Request, res: Response, next: NextFunction): void => {
        Promise.resolve(fn(req, res, next)).catch(next);
    };
};

// Define date ranges
const getDateRanges = () => {
    const today = new Date();
    
    // Current month
    const thisMonthStart = new Date(today.getFullYear(), today.getMonth(), 1);
    const thisMonthEnd = new Date(today.getFullYear(), today.getMonth() + 1, 0); // Last day of the current month

    // Last month
    const lastMonthStart = new Date(today.getFullYear(), today.getMonth() - 1, 1);
    const lastMonthEnd = new Date(today.getFullYear(), today.getMonth(), 0); // Last day of the last month

    return {
        thisMonth: { start: thisMonthStart, end: thisMonthEnd },
        lastMonth: { start: lastMonthStart, end: lastMonthEnd },
    };
};

export const getDashboardStats = asyncHandler(async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { thisMonth, lastMonth } = getDateRanges();

    const thisMonthOrdersPromise = Order.find({
        createdAt: {
            $gte: thisMonth.start,
            $lte: thisMonth.end,
        },
    });

    const lastMonthOrdersPromise = Order.find({
        createdAt: {
            $gte: lastMonth.start,
            $lte: lastMonth.end,
        },
    });

    const lastSixMonthOrdersPromise = Order.find({
        createdAt: {
            $gte: new Date(new Date().getFullYear(), new Date().getMonth() - 6, 1), // Six months ago
            $lte: new Date(),
        },
    });

    const latestTransactionPromise = Order.find({})
        .select(["orderItems", "discount", "total", "status"])
        .limit(4);

    const [
        thisMonthOrders,
        lastMonthOrders,
        lastSixMonthOrders,
        latestTransaction,
    ] = await Promise.all([
        thisMonthOrdersPromise,
        lastMonthOrdersPromise,
        lastSixMonthOrdersPromise,
        latestTransactionPromise,
    ]);

    res.status(200).json({
        success: true,
        thisMonthOrders,
        lastMonthOrders,
        lastSixMonthOrders,
        latestTransaction,
    });
});

export const getBarCharts = asyncHandler(async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    // Your logic for bar charts
    res.status(200).json({
        success: true,
        // bar chart data
    });
});

export const getLineCharts = asyncHandler(async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    // Your logic for line charts
    res.status(200).json({
        success: true,
        // line chart data
    });
});

export const getPieCharts = asyncHandler(async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    // Your logic for pie charts
    res.status(200).json({
        success: true,
        // pie chart data
    });
});
