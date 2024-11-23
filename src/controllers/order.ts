import { Request, Response, NextFunction } from "express";
import { TryCatch as OriginalTryCatch } from "../middlewares/error.js";
import { NewOrderRequestBody } from "../types/types.js";
import { Order } from "../models/order.js";
import { invalidateCache, reduceStock } from "../utils/features.js";
import ErrorHandler from "../utils/utility-class.js";
import { myCache } from "../app.js";
import { json } from "stream/consumers";
import { id_ID } from "@faker-js/faker";

const asyncHandler = (fn: (req: Request, res: Response, next: NextFunction) => Promise<void>) => {
    return (req: Request, res: Response, next: NextFunction): void => {
        fn(req, res, next).catch(next);
    };
};

export const myOrders = asyncHandler(async (req, res, next): Promise<void> => {
    const { id: user } = req.query;

    const key = `my-orders-${user}`;

    let orders = [];

    if (myCache.has(key))
        orders = JSON.parse(myCache.get(key) as string);
    else {
        orders = await Order.find({ user });
        myCache.set(key, JSON.stringify(orders));
    }
    res.status(200).json({
        success: true,
        orders,
    });
});

export const allOrders = asyncHandler(async (req, res, next): Promise<void> => {
    const key = `all-orders`;
    let orders = [];

    if (myCache.has(key))
        orders = JSON.parse(myCache.get(key) as string);
    else {
        orders = await Order.find().populate("user", "name");
        myCache.set(key, JSON.stringify(orders));
    }
    res.status(201).json({
        success: true,
        orders,
    });
});

export const getSingleOrder = asyncHandler(async (req, res, next): Promise<void> => {
    const { id } = req.params;
    const key = `order-${id}`;

    let order;

    if (myCache.has(key))
        order = JSON.parse(myCache.get(key) as string);
    else {
        order = await Order.findById(id).populate("user", "name");
        if (!order) {
            return next(new ErrorHandler(" order ID invalid", 404));
        }
        myCache.set(key, JSON.stringify(order));
    }
    res.status(201).json({
        success: true,
        order,
    });
});

export const newOrder = asyncHandler(
    async (req: Request<{}, {}, NewOrderRequestBody>, res, next) => {
        const { shippingInfo,
            orderItems,
            user,
            subtotal,
            tax,
            shippingcharges,
            discount,
            total,
        } = req.body;
        
        if (
            !shippingInfo ||
            !orderItems ||
            !user ||
            !subtotal ||
            !tax ||
            !shippingcharges ||
            !discount ||
            !total
        ) {
            return next(new ErrorHandler("Please enter all field", 400));
        }
        
        const order = await Order.create({ shippingInfo,
            orderItems,
            user,
            subtotal,
            tax,
            shippingcharges,
            discount,
            total,
        });

        await reduceStock(orderItems);
        invalidateCache({ product: true,
            order: true,
            admin: true,
            userId: user,
            productId: order.orderItems.map(i => String(i.productId)),
        });

        res.status(201).json({
            success: true,
            message: " order succeded",
        });
    }
);

export const processOrder = asyncHandler(
    async (req, res, next) => {
        const { id } = req.params;

        const order = await Order.findById(id);

        if (!order) {
            return next(new ErrorHandler(" Order not found", 404));
        }

        switch (order.status) {
            case "Processing":
                order.status = "Shipped";
                break;
            case "Shipped":
                order.status = "Delivered";
                break;
            default:
                order.status = "Delivered";
                break;
        }

        await order.save();

        invalidateCache({ product: false,
            order: true,
            admin: true,
            userId: order.user,
            orderId: String(order._id),
        });

        res.status(201).json({
            success: true,
            message: " order process succeded",
        });
    }
);

export const deleteOrder = asyncHandler(
    async (req, res, next) => {
        const { id } = req.params;

        const order = await Order.findById(id);

        if (!order) {
            return next(new ErrorHandler(" Order not found", 404));
        }
      
        await order.deleteOne();

        invalidateCache({ product: false,
            order: true,
            admin: true,
            userId: order.user,
            orderId: String(order._id),
        });

        res.status(201).json({
            success: true,
            message: " order delete succeded",
        });
    }
);