import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();
// Custom type for authenticated requests that include a `user` property
export interface AuthenticatedRequest extends Request {
    user?: jwt.JwtPayload | string; // Optional user property
}
// Middleware to authenticate JWT tokens
export const authenticateJWT = (
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction
) => {
    const token = req.cookies.Usertoken; // Retrieve from cookies or other sources

    if (!token) {
        return res.status(401).json({ error: 'Access denied. No token provided.' });
    }

    try {
        const jwtSecret = process.env.JWT_SECRET;

        if (!jwtSecret) {
            console.error('JWT secret not defined.');
            return res.status(500).json({ error: 'Server error: JWT secret not defined.' });
        }
        const decoded = jwt.verify(token, jwtSecret);
        req.user = decoded;
        next(); // Token is valid, proceed to the next middleware
    } catch (error) {
        console.error('JWT verification failed:', error);
        return res.status(401).json({ error: 'Invalid token. Please log in again.' });
    }
};
