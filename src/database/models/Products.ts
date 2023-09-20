import mongoose, { Document, Schema } from "mongoose";
import { IProduct } from "../../interfaces/IProduct";


interface ProductModel extends IProduct, Document { };
// enum Catogries {
//     Mobiles = "mobiles",
//     Electronics = "electronics",
//     Furniture = "furniture",
//     Appliances = "appliances",
//     Toys = "toys",
//     Sports = "sports",
//     Bikes = "bikes",
//     Cars = "cars",
//     Fashion = "fashion"
// }

const productSchema = new Schema<ProductModel>({
    productID: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    imageName: { type: String, required: true },
    imageUrl: { type: String, required: true, default: " " },
    category: { type: String, required: true, },
    company: { type: String, required: true },
    featured: { type: Boolean, required: true, default: false },
    rating: { type: Number, required: true, min: 1, max: 10 },
    price: { type: Number, required: true, min: 0 }
});

const ProductModel = mongoose.model<ProductModel>('Product', productSchema);


export {
    ProductModel
}