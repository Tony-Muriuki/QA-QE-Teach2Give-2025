"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// const { setupAliases } = require('import-aliases');
// setupAliases();
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const userRoutes_js_1 = __importDefault(require("./routes/userRoutes.js"));
const bookRoutes_js_1 = __importDefault(require("./routes/bookRoutes.js"));
const authRoute_js_1 = __importDefault(require("./routes/authRoute.js"));
const cors_1 = __importDefault(require("cors"));
// const bookRouter = require('@app/routes/bookRoutes.js');
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT;
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(userRoutes_js_1.default);
app.use(bookRoutes_js_1.default);
app.use(authRoute_js_1.default);
app.listen(port, () => {
    console.log(`server running on port ${port}`);
});
