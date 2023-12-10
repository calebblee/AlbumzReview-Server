import express from 'express';
import AuthController from "./controllers/users/auth-controller.js";
import cors from 'cors';
import mongoose from "mongoose";
import session from "express-session";
import dotenv from 'dotenv'
import ReviewController from './controllers/reviews/review-controller.js';
import FollowsController from './controllers/follows/follows-controller.js';
dotenv.config()

const CONNECTION_STRING = //process.env.DB_CONNECTION_STRING ||
    'mongodb://127.0.0.1:27017/';

mongoose.connect(CONNECTION_STRING);
console.log(CONNECTION_STRING)
const app = express()

app.use(
    session({
        secret: "any string",
        resave: false,
        saveUninitialized: true,
    })
);
app.use(
    cors({
        credentials: true,
        origin: "http://localhost:3000",
    })
);

app.use(express.json());
AuthController(app);
ReviewController(app);
FollowsController(app);
app.listen(process.env.PORT || 4000);