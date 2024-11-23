import { NextFunction, Request, Response } from "express";
import { rm } from "fs";
import { myCache } from "../app.js";
import { TryCatch } from "../middlewares/error.js";
import { Product } from "../models/products.js";
import { BaseQuery, NewProductRequestBody, SearchRequestQuery } from "../types/types.js";
import { invalidateCache } from "../utils/features.js";
import ErrorHandler from "../utils/utility-class.js";

// Extend the Request interface
declare global {
    namespace Express {
        interface Request {
            file?: Express.Multer.File;
        }
    }
}

// Get latest products
export const getlatestproduct = TryCatch(
    async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        let products;

        if (myCache.has("latest-product")) {
            products = JSON.parse(myCache.get("latest-product") as string);
        } else {
            products = await Product.find({}).sort({ createdAt: -1 }).limit(5);
            myCache.set("latest-product", JSON.stringify(products));
        }

        res.status(200).json({
            success: true,
            products,
        });
    }
);

// Get all categories
export const getallcategories = TryCatch(
    async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        let categories;

        if (myCache.has("categories")) {
            categories = JSON.parse(myCache.get("categories") as string);
        } else {
            categories = await Product.distinct("category");
            myCache.set("categories", JSON.stringify(categories));
        }

        res.status(200).json({
            success: true,
            categories,
        });
    }
);

// Get admin products
export const getadminproducts = TryCatch(
    async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        let allproducts;

        if (myCache.has("allproducts")) {
            allproducts = JSON.parse(myCache.get("allproducts") as string);
        } else {
            allproducts = await Product.find({});
            myCache.set("allproducts", JSON.stringify(allproducts));
        }

        res.status(200).json({
            success: true,
            allproducts,
        });
    }
);

// Get single product
export const getsingleproduct = TryCatch(
    async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        const id = req.params.id;
        let product;

        if (myCache.has(`product-${id}`)) {
            product = JSON.parse(myCache.get(`product-${id}`) as string);
        } else {
            product = await Product.findById(id);
            if (!product) return next(new ErrorHandler("Product not found", 404));
            myCache.set(`product-${id}`, JSON.stringify(product));
        }

        res.status(200).json({
            success: true,
            product,
        });
    }
);

// Create new product
export const newProduct = TryCatch(
    async (req: Request<{}, {}, NewProductRequestBody>, res: Response, next: NextFunction): Promise<void> => {
        const { name, price, stock, category } = req.body;
        const photo = req.file;

        if (!photo) return next(new ErrorHandler("Please provide a photo", 401));

        if (!name || !price || !category || !stock) {
            rm(photo.path, () => {
                console.log("Deleted");
            });
            return next(new ErrorHandler("Please enter all fields", 401));
        }

        let photoPath = photo.path.replace(/\\/g, '/'); // Replace backslashes with forward slashes
        photoPath = photoPath.replace(/^uploads\//, '');

        await Product.create({
            name,
            price,
            stock,
            category: category.toLowerCase(),
            photo: photoPath,
        });

        invalidateCache({ product: true, admin: true });
        res.status(201).json({
            success: true,
            message: "Product created successfully",
        });
    }
);

// Update product
export const updateproduct = TryCatch(
    async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        const { id } = req.params;
        const { name, price, stock, category } = req.body;
        const photo = req.file;
        const product = await Product.findById(id);

        if (!product) return next(new ErrorHandler("Product not found", 404));

        if (photo) {
            rm(product.photo, () => {
                console.log("Old photo deleted");
 });
            product.photo = photo.path.replace(/\\/g, '/'); // Ensure path format
        }
        if (name) product.name = name;
        if (price) product.price = price;
        if (stock) product.stock = stock;
        if (category) product.category = category.toLowerCase();

        await product.save();
        invalidateCache({ product: true, productId: String(product._id), admin: true });

        res.status(200).json({
            success: true,
            message: "Product updated successfully",
        });
    }
);

// Delete product
export const deleteproduct = TryCatch(
    async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        const product = await Product.findById(req.params.id);

        if (!product) return next(new ErrorHandler("Product not found", 404));

        rm(product.photo, () => {
            console.log("Product photo deleted");
        });

        await product.deleteOne();
        invalidateCache({ product: true, productId: String(product._id), admin: true });

        res.status(204).send(); // 204 No Content indicates successful deletion
    }
);

// Get all products with search and pagination
export const getallproducts = TryCatch(
    async (req: Request<{}, {}, {}, SearchRequestQuery>, res: Response, next: NextFunction): Promise<void> => {
        const { search, sort, category, price } = req.query;
        const page = Number(req.query.page) || 1;
        const limit = Number(process.env.PRODUCT_PER_PAGE) || 8;
        const skip = (page - 1) * limit;

        const baseQuery: BaseQuery = {};

        if (search) {
            baseQuery.name = {
                $regex: search,
                $options: "i",
            };
        }

        if (price) {
            baseQuery.price = {
                $lte: Number(price),
            };
        }

        if (category) baseQuery.category = category;

        const productPromise = Product.find(baseQuery)
            .sort(sort ? { price: sort === "asc" ? 1 : -1 } : {})
            .limit(limit)
            .skip(skip);

        const [products, filteredOnlyProducts] = await Promise.all([
            productPromise,
            Product.find(baseQuery),
        ]);

        const totalPage = Math.ceil(filteredOnlyProducts.length / limit);

        res.status(200).json({
            success: true,
            products,
            totalPage,
        });
    }
);

// Delete random products (if needed)
const deleterandomproduct = async (count: number = 10): Promise<void> => {
    const products = await Product.find({}).skip(2);

    for (let i = 0; i < count; i++) {
        const product = products[i];
        if (product) {
            await Product.deleteOne({ _id: product._id });
        }
    }
    console.log({ success: true });
};