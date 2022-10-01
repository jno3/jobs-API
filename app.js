import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
const app = express();
import mongoose from 'mongoose';

import notFoundMiddleware from './middleware/not-found.js';
import errorHandlerMiddleware from './middleware/error-handler.js';

import authRouter from './routes/auth.js'
import jobsRouter from './routes/jobs.js';


app.use(express.json());


app.use('/api/v1/auth', authRouter);
app.use('/api/v1/jobs', jobsRouter);


app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI;

const start = async () => {
    try {
        mongoose.connect(MONGO_URI).then(() => {
            app.listen(port, console.log(`app is listening on port ${port}`));
        })
    }
    catch (err) {
        console.log(err);
    }
}

start();