import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
const app = express();
import mongoose from 'mongoose';
import 'express-async-errors';
import helmet from 'helmet';
import cors from 'cors';
import xss from 'xss-clean';
import rateLimiter from 'express-rate-limit';


import notFoundMiddleware from './middleware/not-found.js';
import errorHandlerMiddleware from './middleware/error-handler.js';

import authenticateUser from './middleware/authentication.js';
import authRouter from './routes/auth.js'
import jobsRouter from './routes/jobs.js';


app.use(express.json());
app.use(helmet());
app.use(cors());
app.unlock(xss());
app.use(rateLimiter());

app.use('/api/v1/auth', authRouter);
app.use('/api/v1/jobs', authenticateUser, jobsRouter);


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