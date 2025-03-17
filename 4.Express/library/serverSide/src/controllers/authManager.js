"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt_1 = __importDefault(require("bcrypt"));
const db_config_js_1 = __importDefault(require("./db.config.js"));
const helper_js_1 = __importDefault(require("../utils/helper.js"));
const helper = new helper_js_1.default();
class AuthManager {
    async login(req, res) {
        const { email, password } = req.body;
        try {
            // Check if user exists
            const existingUser = await db_config_js_1.default.query('SELECT * FROM users WHERE email = $1', [email]);
            if (existingUser.rows.length === 0) {
                return res.status(403).json({ message: 'Invalid email or password' });
            }
            const user = existingUser.rows[0];
            // Compare the hashed password
            const isPasswordValid = await bcrypt_1.default.compare(password, user.password);
            if (!isPasswordValid) {
                return res.status(403).json({ message: 'Invalid email or password' });
            }
            const user_role = await db_config_js_1.default.query('select * from user_roles where id = $1', [user.role_id]);
            // Generate JWT token
            const token = await helper.generateToken({ id: user.id, role: user_role.rows[0].role_name });
            return res.status(200).json({ token });
        }
        catch (error) {
            console.error('Login error:', error);
            return res.status(500).json({ message: 'Internal server error' });
        }
    }
}
exports.default = AuthManager;
