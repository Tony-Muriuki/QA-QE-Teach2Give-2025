import pool from './db.config.js';
import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';
import Helper from '../utils/helper.js'

const helper = new Helper()
async function generateId() {
    const result = await pool.query('SELECT MAX(id) FROM users');
    const maxId = result.rows[0]?.max || 0;
    return maxId + 1;
}

class User {
    createUser = async (req: Request, res: Response): Promise<any>  => {
        try {
            console.log(req.body)
            const { email, name, password } = req.body;

            // Check if the user already exists
            const existingUser = await pool.query('SELECT email FROM users WHERE email = $1', [email]);
            if (existingUser.rows.length > 0) {
                return res.status(409).json({ "message": "User already exists" });
            }
  
            const hashedPassword = await helper.hashPassword(password);

            //first user becomes admin
            const users = await pool.query('SELECT * FROM users;');
            const roleName = users.rows.length === 0 ? 'admin' : 'borrower';
            //console.log('rolename', roleName)
            const roleId = await this.createRole(roleName);

            await pool.query(
                "INSERT INTO users ( email, password, name, role_id) VALUES ($1, $2, $3, $4)",
                [email, hashedPassword, name, roleId]
            );
            return res.status(201).json({ "message": "User created successfully" });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ "message": "Internal Server Error" });
        }
    }

    async addLibrarian(req: Request, res: Response): Promise<any> {
        const { userId } = req.params;
        console.log(userId);
    
        try {
            const user = await pool.query('SELECT * FROM users WHERE id = $1', [userId]);
            if (user.rows.length === 0) {
                return res.status(404).json({ "message": "User not found" });
            }

            //check if 'librarian' role exists else it is created
            let role = await pool.query('SELECT id FROM user_roles WHERE role_name = $1', ['librarian']);
            
            let roleId;
            if (role.rows.length === 0) {
                const newRole = await pool.query('INSERT INTO user_roles (role_name) VALUES ($1) RETURNING id', ['librarian']);
                roleId = newRole.rows[0].id;
            } else {
                roleId = role.rows[0].id;
            }
    
            const result = await pool.query('UPDATE users SET role_id = $1 WHERE id = $2', [roleId, userId]);
    
            return res.status(200).json({ "message": "User promoted to librarian" });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ "message": "Internal Server Error" });
        }
    }

    async createRole(roleName: string) {
        try {
            const existingRole = await pool.query('SELECT id, role_name FROM user_roles WHERE role_name = $1', [roleName]);
    
            if (existingRole.rows.length > 0) {
                return existingRole.rows[0].id;
            }
    
            const newRole = await pool.query(
                'INSERT INTO user_roles (role_name) VALUES ($1) RETURNING id', 
                [roleName]
            );
    
            return newRole.rows[0].id;
        } catch (error) {
            console.error("Error creating role:", error);
        }
    }
    

    async getUser(req: Request, res: Response): Promise<any> {
        try {
            const { id } = req.params;
            const user = await pool.query('SELECT * FROM users WHERE id = $1', [id]);
            return res.status(200).json({ "user": user.rows[0] || null });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ "message": "Internal Server Error" });
        }
    }
    getUsers = async (req: Request, res: Response): Promise<any> => {
        try {
            const users = await pool.query('SELECT * FROM users');
            return res.status(200).json({ "users": users.rows });
        } catch (error) {
            console.error("Error:", error);
            return res.status(500).json({ "message": "Internal Server Error" });
        }
    }
    
}


export default User;
