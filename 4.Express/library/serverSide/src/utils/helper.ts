import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

class Helper {
    async generateToken(user: { id: string; role: string }) {
        return jwt.sign(
          { id: user.id, role: user.role },
          process.env.JWT_SECRET as string,
          { expiresIn: '2d' }
        );
      };

      async hashPassword(password: string) {
        const saltRounds = 10;
        return await bcrypt.hash(password, saltRounds);
    }
    
}

export default Helper