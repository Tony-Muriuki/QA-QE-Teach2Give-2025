"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authManager_js_1 = __importDefault(require("../controllers/authManager.js"));
const authManager = new authManager_js_1.default();
const authRoute = express_1.default.Router();
authRoute.post('/auth/login', authManager.login);
exports.default = authRoute;
