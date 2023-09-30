import cors from 'cors';
import express from 'express';

import { router as productRouter } from './routes/products/products';
import { router as rootRouter } from './routes/root/root';
import { router as userRouter } from './routes/users/users';

import { Express } from 'express';
import { config } from './config/config';
import { connectDB } from './database/mongoose';


const app: Express = express();

app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/", rootRouter);
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