import express, { Request, Response } from "express";
import dotenv from "dotenv";
import { readFileSync } from "fs";
import path from "path";
import cors from "cors";

// Load environment variables
dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(express.json()); // Enables parsing of JSON request body
app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:5173",
    methods: "GET, PUT, DELETE",
    credentials: true,
  })
);

// Get the current directory
const _dirname = path.resolve();

// Book type definition
interface Book {
  id: number;
  title: string;
  genre: string;
  year: number;
  pages: number;
}

// Read the book data from the database file with error handling
let books: Book[] = [];
try {
  const booksData = readFileSync(
    path.join(_dirname, "src", "db", "db.json"),
    "utf-8"
  );
  books = JSON.parse(booksData);
} catch (error: unknown) {
  if (error instanceof Error) {
    console.error("Error reading the database file:", error.message);
  } else {
    console.error("An unknown error occurred:", error);
  }
}

// Route: Get books with filtering and sorting
app.get("/api/books", (req: Request, res: Response) => {
  let filteredBooks: Book[] = [...books];

  // Filtering
  if (req.query.genre) {
    filteredBooks = filteredBooks.filter(
      (book) =>
        book.genre.toLowerCase() === String(req.query.genre).toLowerCase()
    );
  }

  const year = Number(req.query.year);
  if (!isNaN(year)) {
    filteredBooks = filteredBooks.filter((book) => book.year === year);
  }

  const pages = Number(req.query.pages);
  if (!isNaN(pages)) {
    filteredBooks = filteredBooks.filter((book) => book.pages >= pages);
  }

  // Sorting
  const sortKey = String(req.query.sortBy);
  const order = String(req.query.order) === "desc" ? -1 : 1;

  if (sortKey && ["year", "pages"].includes(sortKey)) {
    filteredBooks.sort((a, b) =>
      a[sortKey as keyof Book] > b[sortKey as keyof Book] ? order : -order
    );
  }

  res.json(filteredBooks);
});

// Root Route
app.get("/", (req: Request, res: Response) => {
  res.send(`Hello World, Be humble to us`);
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
