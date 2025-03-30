import express from "express";
import { registerUser } from "../controllers/authController";

const router = express.Router();

//Public Routes

router.post("/register", registerUser);

export default router;
