import express from "express";
import { Request, Response, NextFunction } from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
//1:Configuring the dotenv
dotenv.config();

//2:Creating an instance of express
const app = express();

//3.Enabling Server PORT
const PORT = process.env.PORT || 5000;

//NEVER FORGET IN YOUR LIFE TO DO THIS

// -----------------VERY IMPORTANT MIDLEWARE--------
app.use(express.json()); //Parses JSON request body---------------
app.use(express.urlencoded({ extended: true })); //  Parse URL-encoded form data--------
app.use(cookieParser()); // Use cookie-parser middleware

//Enable CORS with OPTIONS(RECOMMENDED)
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: "GET,PUT,PATCH,DELETE",
    credentials: true, //Allows cookies and auth headers
  })
);

//ROUTES
app.get("/", (req: Request, res: Response) => {
  res.send("I AM WORKING");
});

app.listen(PORT, () => {
  console.log(`Server is running at port http://localhost:${PORT}`);
});
