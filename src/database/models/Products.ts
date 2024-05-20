import mongoose, { Document, Schema } from "mongoose";
import { IProduct } from "@/interfaces/IProduct";
import { Categories } from '@/enums/categories';

interface ProductModel extends IProduct, Document { };

const productSchema = new Schema<ProductModel>({
    productID: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    imageName: { type: String, required: true },
    imageUrl: { type: String, required: true, default: " " },
    category: { type: String, required: true, enum: Object.values(Categories) },
    company: { type: String, required: true },
    featured: { type: Boolean, required: true, default: false },
    rating: { type: Number, required: true, min: 1, max:  10},
    price: { type: Number, required: true, min: 0 }
});

export const ProductModel = mongoose.model<ProductModel>('Product', productSchema);
