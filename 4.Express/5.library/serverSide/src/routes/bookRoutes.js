"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const books_js_1 = __importDefault(require("../controllers/books.js"));
const express_1 = __importDefault(require("express"));
const authMiddleware_js_1 = __importDefault(require("../middleware/authMiddleware.js"));
// import Books from '@app/controllers/books.js'
const mid = new authMiddleware_js_1.default();
const bookRouter = express_1.default.Router();
const booksController = new books_js_1.default();
bookRouter.post('/api/book', mid.isLibrarian, booksController.addBook);
bookRouter.get('/api/books', booksController.getBooks);
bookRouter.get('/api/book/:id', booksController.getBook);
bookRouter.get('/api/books/filtered', booksController.filterBooks);
bookRouter.delete('/api/book/:id', mid.isLibrarian, booksController.deleteBook);
bookRouter.patch('/api/book/:id', mid.isLibrarian, booksController.editBook);
exports.default = bookRouter;
