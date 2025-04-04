// const { setupAliases } = require('import-aliases');
// setupAliases();
import express from 'express';
import dotenv from 'dotenv';
import userRouter from './routes/userRoutes.js';
import bookRouter from './routes/bookRoutes.js';
import authRoute from './routes/authRoute.js';
import cors from 'cors';
// const bookRouter = require('@app/routes/bookRoutes.js');
dotenv.config();
const app = express();
const port = process.env.PORT;
app.use(cors());
app.use(express.json());
app.use(userRouter);
app.use(bookRouter);
app.use(authRoute);
app.listen(port, () => {
    console.log(`server running on port ${port}`);
});
