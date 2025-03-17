import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
class Helper {
    async generateToken(user) {
        return jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '2d' });
    }
    ;
    async hashPassword(password) {
        const saltRounds = 10;
        return await bcrypt.hash(password, saltRounds);
    }
}
export default Helper;
