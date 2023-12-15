import { CorsOptions } from 'cors';
import { allowedOrigins } from './allowedOrigins';


export const corsOptions: CorsOptions = {
    origin(requestOrigin, callback) {
        if (!requestOrigin) {
            callback(null, true);
        } else if (allowedOrigins.indexOf(requestOrigin) !== -1) {
            callback(null, true);
        } else {
            callback(new Error("Not allowed by CORS."));
        }
    },
    optionsSuccessStatus: 200,
    credentials: true,
};