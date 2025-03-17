import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

interface DecodedToken {
  id: string;
  role: string;
}
class Middleware {
  isAdminOrLibrarian(req: Request, res: Response, next: NextFunction): any {
    const authHeader = req.headers['authorization'];
  
    if (!authHeader) {
      return res.status(403).json({ message: 'No token provided' });
    }
  
    const token = authHeader.split(' ')[1]; 
  
    if (!token) {
      return res.status(403).json({ message: 'Invalid token format' });
    }
  
    try {
      const secret = process.env.JWT_SECRET || ''
  
      const decoded = jwt.verify(token, secret);
      
      if ((decoded as any).role !== 'admin' && (decoded as any).role !== 'librarian'){
        return res.status(403).json({ message: 'Access denied. Only admin or Librarian is allowed' });
      }
  
      next(); 
    } catch (error) {
      console.error('JWT Error:', error);
      return res.status(403).json({ message: 'Invalid token' });
    }
  };
  
  isAdmin(req: Request, res: Response, next: NextFunction): any {
    const authHeader = req.headers['authorization'];
  
    if (!authHeader) {
      return res.status(403).json({ message: 'No token provided' });
    }
  
    const token = authHeader.split(' ')[1]; 
  
    if (!token) {
      return res.status(403).json({ message: 'Invalid token format' });
    }
  
    try {
      const secret = process.env.JWT_SECRET || ''
  
      const decoded = jwt.verify(token, secret);
      
      if ((decoded as any).role !== 'admin'){
        return res.status(403).json({ message: 'Access denied. Only admin is allowed' });
      }
  
      next(); 
    } catch (error) {
      console.error('JWT Error:', error);
      return res.status(403).json({ message: 'Invalid token' });
    }
  };

  isLibrarian(req: Request, res: Response, next: NextFunction): any {
    const authHeader = req.headers['authorization'];
  
    if (!authHeader) {
      return res.status(403).json({ message: 'No token provided' });
    }
  
    const token = authHeader.split(' ')[1]; 
  
    if (!token) {
      return res.status(403).json({ message: 'Invalid token format' });
    }
  
    try {
      const secret = process.env.JWT_SECRET || ''
  
      const decoded = jwt.verify(token, secret);
      
      if ((decoded as any).role !== 'librarian'){
        return res.status(403).json({ message: 'Access denied. Only Librarian is allowed' });
      }
  
      next(); 
    } catch (error) {
      console.error('JWT Error:', error);
      return res.status(403).json({ message: 'Invalid token' });
    }
  };
}





export default Middleware
