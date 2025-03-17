import jwt from 'jsonwebtoken';
class Middleware {
    isAdminOrLibrarian(req, res, next) {
        const authHeader = req.headers['authorization'];
        if (!authHeader) {
            return res.status(403).json({ message: 'No token provided' });
        }
        const token = authHeader.split(' ')[1];
        if (!token) {
            return res.status(403).json({ message: 'Invalid token format' });
        }
        try {
            const secret = process.env.JWT_SECRET || '';
            const decoded = jwt.verify(token, secret);
            if (decoded.role !== 'admin' && decoded.role !== 'librarian') {
                return res.status(403).json({ message: 'Access denied. Only admin or Librarian is allowed' });
            }
            next();
        }
        catch (error) {
            console.error('JWT Error:', error);
            return res.status(403).json({ message: 'Invalid token' });
        }
    }
    ;
    isAdmin(req, res, next) {
        const authHeader = req.headers['authorization'];
        if (!authHeader) {
            return res.status(403).json({ message: 'No token provided' });
        }
        const token = authHeader.split(' ')[1];
        if (!token) {
            return res.status(403).json({ message: 'Invalid token format' });
        }
        try {
            const secret = process.env.JWT_SECRET || '';
            const decoded = jwt.verify(token, secret);
            if (decoded.role !== 'admin') {
                return res.status(403).json({ message: 'Access denied. Only admin is allowed' });
            }
            next();
        }
        catch (error) {
            console.error('JWT Error:', error);
            return res.status(403).json({ message: 'Invalid token' });
        }
    }
    ;
    isLibrarian(req, res, next) {
        const authHeader = req.headers['authorization'];
        if (!authHeader) {
            return res.status(403).json({ message: 'No token provided' });
        }
        const token = authHeader.split(' ')[1];
        if (!token) {
            return res.status(403).json({ message: 'Invalid token format' });
        }
        try {
            const secret = process.env.JWT_SECRET || '';
            const decoded = jwt.verify(token, secret);
            if (decoded.role !== 'librarian') {
                return res.status(403).json({ message: 'Access denied. Only Librarian is allowed' });
            }
            next();
        }
        catch (error) {
            console.error('JWT Error:', error);
            return res.status(403).json({ message: 'Invalid token' });
        }
    }
    ;
}
export default Middleware;
