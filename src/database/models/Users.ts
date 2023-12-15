import mongoose, { Document, Schema } from "mongoose";
import { IUsers } from "../../interfaces/IUsers";
interface UserModel extends IUsers, Document { };


const userSchema = new Schema<UserModel>({
    userId: { type: String, required: true, unique: true },
    username: { type: String, required: true },
    password: { type: String, required: true },
    refreshToken: { type: String, required: true, default: " " },
    wishlist: { type: [String], required: false, default: [] },
    cart: { type: [String], required: false, default: [] },
    role: { type: String, enum: ["admin", "user"], required: true, default: "user" }
});


export const UserModel = mongoose.model("User", userSchema);