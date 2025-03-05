import express from "express";
import dotenv from "dotenv";
import cors from "cors";

// Load environment variables
dotenv.config();

const app = express();

//load the variables
const port = process.env.PORT;
console.log(port); //3000
