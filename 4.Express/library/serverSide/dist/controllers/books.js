import pool from './db.config.js';
class Books {
    async addBook(req, res) {
        const { title, author, genre, pages, year, publisher, description, image, price, created_by } = req.body;
        try {
            await pool.query('INSERT INTO books (title, author, genre, pages, year, publisher, description, image, price, created_by) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)', [title, author, genre, pages, year, publisher, description, image, price, created_by]);
            return res.status(201).json({ message: "Book added successfully!" });
        }
        catch (error) {
            console.error("Error adding book:", error);
            return res.status(500).json({ message: "Internal Server Error" });
        }
    }
    async deleteBook(req, res) {
        const { id } = req.params;
        try {
            const result = await pool.query('DELETE FROM books WHERE id = $1', [id]);
            if (result.rowCount === 0) {
                return res.status(404).json({ message: "Book not found" });
            }
            return res.status(200).json({ message: "Book deleted successfully" });
        }
        catch (error) {
            console.error(error);
            return res.status(500).json({ message: "Internal Server Error" });
        }
    }
    async getBook(req, res) {
        const { id } = req.params;
        try {
            const result = await pool.query('SELECT * FROM books WHERE id = $1 LIMIT 1', [id]);
            if (result.rowCount === 0) {
                return res.status(404).json({ message: "Book not found" });
            }
            return res.status(200).json(result.rows[0]);
        }
        catch (error) {
            console.error(error);
            return res.status(500).json({ message: "Internal Server Error" });
        }
    }
    async getBooks(req, res) {
        try {
            const result = await pool.query("SELECT * FROM books");
            return res.status(200).json(result.rows);
        }
        catch (error) {
            console.error(error);
            return res.status(500).json({ message: "Internal Server Error" });
        }
    }
    async editBook(req, res) {
        const { id } = req.params;
        const { title, author, genre, pages, year, publisher, description, image, price } = req.body;
        try {
            const result = await pool.query('UPDATE books SET title = $1, author = $2, genre = $3, pages = $4, year = $5, publisher = $6, description = $7, image = $8, price = $9 WHERE id = $10 RETURNING *', [title, author, genre, pages, year, publisher, description, image, price, id]);
            if (result.rowCount === 0) {
                return res.status(404).json({ message: "Book not found" });
            }
            return res.status(200).json({ message: "Book updated successfully", book: result.rows[0] });
        }
        catch (error) {
            console.error(error);
            return res.status(500).json({ message: "Internal Server Error" });
        }
    }
    async filterBooks(req, res) {
        const { genre, year } = req.query;
        let books;
        try {
            const yearValue = year ? parseInt(year, 10) : null;
            if (genre && yearValue) {
                books = await pool.query('select * from books where genre = $1 and year = $2', [genre, yearValue]);
            }
            else if (genre) {
                books = await pool.query('select * from books where genre = $1', [genre]);
            }
            else if (yearValue) {
                books = await pool.query('select * from books where year = $1', [yearValue]);
            }
            else {
                return res.status(400).json({ "message": "genre or year is required." });
            }
            return res.status(200).json(books.rows);
        }
        catch (error) {
            console.log(error);
            return res.status(500).json({ "error": "Internal Server Error" });
        }
    }
}
export default Books;
