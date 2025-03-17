import express from "express";
import dotenv from "dotenv";
import { Request, Response } from "express";
import { readFileSync } from "fs";
import path from "path";
import cors from "cors";

// Configuring Dotenv
dotenv.config();

// Instance of Express
const app = express();

// Loading Variables
const port = process.env.PORT || 4000;
console.log(`Server running on port: ${port}`);

// Enable CORS only for http://localhost:5174
app.use(
  cors({
    origin: "http://localhost:5174",
    methods: "GET,POST,PUT,DELETE,PATCH,OPTIONS",
    credentials: true,
    allowedHeaders: "Content-Type,Authorization",
  })
);

// Get the current Directory
const _dirname = path.resolve();
console.log("Project Root Directory:", _dirname);

// Synchronously Read The File
const eventsData = readFileSync(
  path.join(_dirname, "src", "db", "eventsData.json"),
  "utf8"
);

// Default route
app.get("/", (req: Request, res: Response) => {
  res.send("Hello World, I am Learning Express!");
});

// API route to respond with Events Data
app.get("/api/eventsFilter", (req: Request, res: Response) => {
  // res.setHeader("Content-Type", "application/json");
  res.send(eventsData);
});

// Create Server
app.listen(port, () => {
  console.log(`🚀 Server is running on http://localhost:${port}`);
});
