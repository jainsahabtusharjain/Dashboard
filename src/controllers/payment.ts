import { stripe } from "../app.js";
import { TryCatch } from "../middlewares/error.js";
import { Coupon } from "../models/coupon.js";
import ErrorHandler from "../utils/utility-class.js";
import { Request, Response, NextFunction } from "express";

const asyncHandler = (fn: (req: Request, res: Response, next: NextFunction) => Promise<void>) => {
    return (req: Request, res: Response, next: NextFunction): void => {
        fn(req, res, next).catch(next);
    };
};

export const createPaymentIntent = asyncHandler(async (req, res, next): Promise<void> => {
    const { amount } = req.body;
    if (!amount) {
        return next(new ErrorHandler("Please enter an amount", 400));
    }

    const paymentIntent = await stripe.paymentIntents.create({
        amount: Number(amount) * 100,
        currency: "inr",
    });

    res.status(201).json({
        success: true,
        clientSecret: paymentIntent.client_secret,
    });
});

export const newCoupon = asyncHandler(async (req, res, next): Promise<void> => {
    const { coupon, amount } = req.body;
    if (!coupon || !amount) {
        return next(new ErrorHandler("Please enter both coupon and amount", 400));
    }
    await Coupon.create({ code: coupon, amount });
    res.status(201).json({
        success: true,
        message: `Coupon-${coupon} created successfully`,
    });
});

export const applyDiscount = asyncHandler(async (req, res, next): Promise<void> => {
    const { coupon } = req.query;
    const discount = await Coupon.findOne({ code: coupon });

    if (!discount) {
        return next(new ErrorHandler("Coupon Invalid", 400));
    }

    res.status(200).json({
        success: true,
        discount: discount.amount,
    });
});

export const allCoupons = asyncHandler(async (req, res, next): Promise<void> => {
    const coupons = await Coupon.find({});
    res.status(200).json({
        success: true,
        coupons,
    });
});

export const deleteCoupon = asyncHandler(async (req, res, next): Promise<void> => {
    const { id } = req.params;
    const coupon = await Coupon.findByIdAndDelete(id);

    if (!coupon) {
        return next(new ErrorHandler("Coupon Invalid", 400));
    }

    res.status(200).json({
        success: true,
        message: "Coupon deleted successfully",
    });
});