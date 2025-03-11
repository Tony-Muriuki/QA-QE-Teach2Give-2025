import express, { Request, Response } from "express";
import dotenv from "dotenv";
import { readFileSync, writeFileSync } from "fs";
import path from "path";
import cors from "cors";

// Load environment variables
dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(express.json()); // Enables JSON parsing
app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:5173",
    methods: "GET, PUT, PATCH, DELETE",
    credentials: true,
  })
);

// Get the current directory
const __dirname = path.resolve(); // ✅ Fixed variable name

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
const dbPath = path.join(__dirname, "src", "db", "db.json");

function saveBooksToFile() {
  try {
    writeFileSync(dbPath, JSON.stringify(books, null, 2), "utf-8");
  } catch (error) {
    console.error("Error writing to the database file:", error);
  }
}

try {
  const booksData = readFileSync(dbPath, "utf-8");
  books = JSON.parse(booksData);
} catch (error) {
  console.error("Error reading the database file:", error);
}

// 📌 GET books with filtering & sorting
app.get("/api/books", (req: Request, res: Response) => {
  let filteredBooks: Book[] = [...books];

  if (req.query.genre) {
    filteredBooks = filteredBooks.filter(
      (book) =>
        book.genre.toLowerCase() === String(req.query.genre).toLowerCase()
    );
  }

  const year = Number(req.query.year);
  if (Number.isFinite(year)) {
    filteredBooks = filteredBooks.filter((book) => book.year === year);
  }

  const pages = Number(req.query.pages);
  if (Number.isFinite(pages)) {
    filteredBooks = filteredBooks.filter((book) => book.pages >= pages);
  }

  const sortKey = String(req.query.sortBy);
  const order = String(req.query.order) === "desc" ? -1 : 1;

  if (sortKey && ["year", "pages"].includes(sortKey)) {
    filteredBooks.sort((a, b) =>
      a[sortKey as keyof Book] > b[sortKey as keyof Book] ? order : -order
    );
  }

  res.json(filteredBooks);
});

// ✅ PUT: Replace an entire book
app.put("/api/books/:id", (req: Request, res: Response) => {
  const bookId = Number(req.params.id);
  const updatedBook: Partial<Book> = req.body;

  if (
    !updatedBook.title ||
    !updatedBook.genre ||
    !updatedBook.year ||
    !updatedBook.pages
  ) {
    res.status(400).json({
      error: "All book fields (title, genre, year, pages) are required.",
    });
    return;
  }

  const bookIndex = books.findIndex((book) => book.id === bookId);
  if (bookIndex === -1) {
    res.status(404).json({ error: "Book not found." });
    return;
  }

  books[bookIndex] = { ...updatedBook, id: bookId } as Book;
  saveBooksToFile();
  res.json({ message: "Book updated successfully", book: books[bookIndex] });
});

// ✅ PATCH: Update specific book fields
app.patch("/api/books/:id", (req: Request, res: Response) => {
  const bookId = Number(req.params.id);
  const updates = req.body;

  const bookIndex = books.findIndex((book) => book.id === bookId);
  if (bookIndex === -1) {
    res.status(404).json({ error: "Book not found." });
    return;
  }

  books[bookIndex] = { ...books[bookIndex], ...updates };
  saveBooksToFile();
  res.json({ message: "Book updated successfully", book: books[bookIndex] });
});

// ✅ DELETE: Remove a book
app.delete("/api/books/:id", (req: Request, res: Response) => {
  const bookId = Number(req.params.id);
  const bookIndex = books.findIndex((book) => book.id === bookId);

  if (bookIndex === -1) {
    res.status(404).json({ error: "Book not found." });
    return;
  }

  books.splice(bookIndex, 1);
  saveBooksToFile();
  res.json({ message: "Book deleted successfully" });
});

// ✅ Root Route
app.get("/", (req: Request, res: Response) => {
  res.send("Hello World, Be humble to us");
});

// ✅ Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
