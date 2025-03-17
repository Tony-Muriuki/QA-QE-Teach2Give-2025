import Books from "../controllers/books.js";
import express from 'express';
import Middleware from "../middleware/authMiddleware.js";
// import Books from '@app/controllers/books.js'

const mid = new Middleware()
const bookRouter = express.Router();

const booksController = new Books();

bookRouter.post('/api/book', mid.isLibrarian, booksController.addBook);
bookRouter.get('/api/books', booksController.getBooks);
bookRouter.get('/api/book/:id', booksController.getBook);
bookRouter.get('/api/books/filtered', booksController.filterBooks)
bookRouter.delete('/api/book/:id', mid.isLibrarian, booksController.deleteBook);
bookRouter.patch('/api/book/:id', mid.isLibrarian, booksController.editBook);

export default bookRouter;
