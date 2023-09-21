import mongoose from "mongoose";
import { config } from "../config/config";


export async function connectDB(): Promise<mongoose.mongo.Db> {
    const connection = await mongoose.connect(config.STORE_DB_URI);
    return connection.connection.db;
}