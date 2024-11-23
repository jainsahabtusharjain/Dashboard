import { NextFunction, Request, Response } from "express";
import { User } from "../models/user.js";
import { NewUserRequestBody } from "../types/types.js";
import ErrorHandler from "../utils/utility-class.js";
import { TryCatch } from "../middlewares/error.js";

const asyncHandler = (fn: (req: Request, res: Response, next: NextFunction) => Promise<void>) => {
    return (req: Request, res: Response, next: NextFunction): void => {
        fn(req, res, next).catch(next);
    };
};

export const newUser = asyncHandler(async (req: Request<{}, {}, NewUserRequestBody>, res, next): Promise<void> => {
    const { name, email, photo, gender, _id, dob } = req.body;

    let user = await User.findById(_id);
    if (user) {
        res.status(200).json({
            success: true,
            message: `Welcome back, ${user.name}`,
        });
    }

    if (!_id || !name || !email || !photo || !gender || !dob) {
        return next(new ErrorHandler("Please enter all fields", 400));
    }

    user = await User.create({
        name,
        email,
        photo,
        gender,
        _id,
        dob: new Date(dob),
    });

    res.status(201).json({
        success: true,
        message: `Welcome, ${user.name}`,
    });
});

export const getAllUsers = asyncHandler(async (req, res, next): Promise<void> => {
    const users = await User.find();
    res.status(200).json({
        success: true,
        users,
    });
});

export const getUser = asyncHandler(async (req, res, next): Promise<void> => {
    const user = await User.findById(req.params.id);
    if (!user) {
        return next(new ErrorHandler("Invalid ID", 402));
    }

    res.status(200).json({
        success: true,
        user,
    });
});

export const deleteUser = asyncHandler(async (req, res, next): Promise<void> => {
    const user = await User.findById(req.params.id);
    if (!user) {
        return next(new ErrorHandler("Invalid ID", 402));
    }

    await user.deleteOne();
    res.status(200).json({
        success: true,
        message: "User deleted",
    });
});