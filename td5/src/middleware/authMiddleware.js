import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../config/auth.js';

export function requireAuth(req, res, next) {
    const header = req.headers.authorization;

    // Le header doit être de la forme : "Bearer <token>"
    if (!header || !header.startsWith('Bearer ')) {
        return res.status(401).json({ success: false, message: "Token missing" });
    }

    const token = header.split(' ')[1];

    try {
        req.user = jwt.verify(token, JWT_SECRET);   // renvoie le payload si le token est valide
        next();
    } catch (err) {
        return res.status(401).json({ success: false, message: "Invalid or expired token" });
    }
}