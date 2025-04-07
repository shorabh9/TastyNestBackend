import express from 'express';
import userRouter from './src/routes/userRouter.mjs'
import cartRouter from './src/routes/cartRoute.mjs'
import sessionDatabaseHandler from './src/utils/sessionHandler.mjs'
import loginRouter from './src/routes/login.mjs'
import logoutRouter from './src/routes/logoutRouter.mjs'
import fooditemRouter from './src/routes/foodItem.mjs'
import cors from 'cors';
import dotenv from "dotenv";
dotenv.config();

const app = express();
app.set('trust proxy', 1);
const allowedOrigins = process.env.ALLOWED_ORIGINS ? process.env.ALLOWED_ORIGINS.split(',') : ['http://localhost:5173', 'https://food-finder-lime.vercel.app'];

app.use(cors({
    origin: function (origin, callback) {
        if (!origin || allowedOrigins.includes(origin)) {
            return callback(null, true);
        }
        return callback(new Error(`CORS policy does not allow access from: ${origin}`), false);
    },
    credentials: true, // ✅ Allow cookies
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));


app.options('*', cors());
const PORT = process.env.PORT || 9000;
app.use(sessionDatabaseHandler);
app.use(userRouter);
app.use(loginRouter);
app.use(logoutRouter);
app.use(fooditemRouter);
app.use(cartRouter);

app.listen(PORT, () => {
  console.log("Server running on port", PORT);
});
