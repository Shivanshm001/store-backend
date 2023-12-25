import dotenv from 'dotenv';
import multer from 'multer';

process.env.NODE_ENV = process.env.NODE_ENV || "development";

const envFile = process.env.NODE_ENV === "development" ? ".env.development" : ".env";

const envFound = dotenv.config({ path: envFile });
const multerStorage = multer.memoryStorage();
const multerUpload = multer({ storage: multerStorage });

if (envFound.error) throw new Error(`Could not find ${envFile}`);


export const config = {
    STORE_DB_URI: process.env.MONGO_STORE_DB_URI || "",
    PORT: process.env.PORT || 3000,
    AWS_ACCESS_KEY: process.env.AWS_ACCESS_KEY || "",
    AWS_SECRET_ACCESS_KEY: process.env.AWS_SECRET_ACCESS_KEY || "",
    BUCKET_NAME: process.env.BUCKET_NAME || "",
    BUCKET_REGION: process.env.BUCKET_REGION || "",
    JWT_ACCESS_TOKEN_SECRET: process.env.JWT_ACCESS_TOKEN_SECRET || "",
    JWT_REFRESH_TOKEN_SECRET: process.env.JWT_REFRESH_TOKEN_SECRET || "",
    multerStorage,
    multerUpload,
}
