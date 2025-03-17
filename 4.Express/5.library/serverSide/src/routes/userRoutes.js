"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_js_1 = __importDefault(require("../controllers/user.js"));
const express_1 = __importDefault(require("express"));
const authMiddleware_js_1 = __importDefault(require("../middleware/authMiddleware.js"));
const mid = new authMiddleware_js_1.default();
const userRouter = express_1.default.Router();
const user = new user_js_1.default();
userRouter.get('/api/users', mid.isAdminOrLibrarian, user.getUsers);
userRouter.get('/api/user/:id', mid.isAdminOrLibrarian, user.getUser);
userRouter.post('/api/user', user.createUser);
userRouter.patch('/api/librarian/:userId', mid.isAdmin, user.addLibrarian);
exports.default = userRouter;
