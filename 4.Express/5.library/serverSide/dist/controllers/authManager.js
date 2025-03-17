import bcrypt from 'bcrypt';
import pool from './db.config.js';
import Helper from '../utils/helper.js';
const helper = new Helper();
class AuthManager {
    async login(req, res) {
        const { email, password } = req.body;
        try {
            // Check if user exists
            const existingUser = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
            if (existingUser.rows.length === 0) {
                return res.status(403).json({ message: 'Invalid email or password' });
            }
            const user = existingUser.rows[0];
            // Compare the hashed password
            const isPasswordValid = await bcrypt.compare(password, user.password);
            if (!isPasswordValid) {
                return res.status(403).json({ message: 'Invalid email or password' });
            }
            const user_role = await pool.query('select * from user_roles where id = $1', [user.role_id]);
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
export default AuthManager;
