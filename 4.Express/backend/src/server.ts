import express, { Request, Response } from "express";
import dotenv from "dotenv";
import { Pool } from "pg";
import cors from "cors";

// Load environment variables
dotenv.config();

// Initialize Express
const app = express();
const port = process.env.PORT || 3000;

// Database Connection Pool
const pool = new Pool({
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

// export default pool;

// Middleware
app.use(express.json()); // Enables JSON parsing
app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:5173",
    methods: "GET, POST, PUT, PATCH, DELETE",
    credentials: true,
  })
);

// Get All Books
app.get("/api/books", async (req: Request, res: Response): Promise<void> => {
  try {
    const result = await pool.query("SELECT * FROM books");
    res.json(result.rows);
  } catch (error) {
    console.error("Error getting books:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// Get a Single Book by ID
app.get(
  "/api/books/:id",
  async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params;
      const result = await pool.query("SELECT * FROM books WHERE id = $1", [
        id,
      ]);

      if (result.rows.length === 0) {
        res.status(404).json({ message: "Book not found" });
        return;
      }

      res.json(result.rows[0]);
    } catch (error) {
      console.error("Error getting book:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
);

// Add a New Book
app.post("/api/books", async (req: Request, res: Response): Promise<void> => {
  try {
    const {
      title,
      author,
      genre,
      year,
      pages,
      publisher,
      description,
      image,
      price,
    } = req.body;
    const result = await pool.query(
      `INSERT INTO books (title, author, genre, year, pages, publisher, description, image, price) 
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *`,
      [title, author, genre, year, pages, publisher, description, image, price]
    );

    res
      .status(201)
      .json({ message: "Book added successfully", book: result.rows[0] });
  } catch (error) {
    console.error("Error adding book:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// Update a Book (PUT - Full Replace)
app.put(
  "/api/books/:id",
  async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params;
      const {
        title,
        author,
        genre,
        year,
        pages,
        publisher,
        description,
        image,
        price,
      } = req.body;

      const result = await pool.query(
        `UPDATE books SET title=$1, author=$2, genre=$3, year=$4, pages=$5, publisher=$6, 
       description=$7, image=$8, price=$9 WHERE id=$10 RETURNING *`,
        [
          title,
          author,
          genre,
          year,
          pages,
          publisher,
          description,
          image,
          price,
          id,
        ]
      );

      if (result.rows.length === 0) {
        res.status(404).json({ message: "Book not found" });
        return;
      }

      res.json({ message: "Book updated successfully", book: result.rows[0] });
    } catch (error) {
      console.error("Error updating book:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
);

// Update Specific Fields (PATCH)
app.patch(
  "/api/books/:id",
  async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params;
      const fields = Object.keys(req.body);
      const values = Object.values(req.body);

      if (fields.length === 0) {
        res.status(400).json({ message: "No fields to update" });
        return;
      }

      const setClause = fields
        .map((field, index) => `${field}=$${index + 1}`)
        .join(", ");
      const query = `UPDATE books SET ${setClause} WHERE id=$${
        fields.length + 1
      } RETURNING *`;

      const result = await pool.query(query, [...values, id]);

      if (result.rows.length === 0) {
        res.status(404).json({ message: "Book not found" });
        return;
      }

      res.json({ message: "Book updated successfully", book: result.rows[0] });
    } catch (error) {
      console.error("Error updating book:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
);

// Delete a Book
app.delete(
  "/api/books/:id",
  async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params;
      const result = await pool.query(
        "DELETE FROM books WHERE id = $1 RETURNING *",
        [id]
      );

      if (result.rows.length === 0) {
        res.status(404).json({ message: "Book not found" });
        return;
      }

      res.json({ message: "Book deleted successfully" });
    } catch (error) {
      console.error("Error deleting book:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
);

// Root Route
app.get("/", (req: Request, res: Response) => {
  res.send("Hello World, Be humble to us!");
});

// Start the Server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
