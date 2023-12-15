import cors from 'cors';
import express, { Express } from 'express';

import { router as authRouter } from './routes/auth/auth';
import { router as productRouter } from './routes/products/products';
import { router as rootRouter } from './routes/root/root';
import { router as userRouter } from './routes/users/users';


import { config } from './config/config';
import { corsOptions } from './config/corsOptions';

import { connectDB } from './database/mongoose';
import { verifyJWT } from './middleware/verifyJWT';
import cookieParser from 'cookie-parser';

const app: Express = express();

app.use(cors(corsOptions));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());



app.use("/", rootRouter);
app.use("/auth", authRouter);
// app.use(verifyJWT);
app.use("/api/v1/users", userRouter)
app.use("/api/v1/products", productRouter);









async function startServer() {
    try {
        await connectDB();

        app.listen(config.PORT, () => {
            console.log(`
    #############################
    Server listening on port ${config.PORT}
    #############################
    `)
        });
    } catch (error) {
        if (error) {
            console.error(`Error starting server: ${error}`)
        }
    }
}
startServer()