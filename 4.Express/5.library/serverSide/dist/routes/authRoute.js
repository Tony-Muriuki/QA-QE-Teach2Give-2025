import express from 'express';
import AuthManager from '../controllers/authManager.js';
const authManager = new AuthManager();
const authRoute = express.Router();
authRoute.post('/auth/login', authManager.login);
export default authRoute;
