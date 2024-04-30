import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

// Custom type for authenticated requests that include a `user` property
export interface AuthenticatedRequest extends Request {
    user?: jwt.JwtPayload | string; // Optional user property
}

// Middleware to authenticate JWT tokens from "Authorization" header
export const authenticateJWT = (
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction
) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        console.log("No valid authorization header provided.");
        return res.status(401).json({ error: "Unauthorized: No valid token provided." });
    }

    const token = authHeader.split(" ")[1]; // Extract the token
    if (!token) {
        console.log("Token is missing.");
        return res.status(401).json({ error: "Unauthorized: Token is missing." });
    }

    try {
        const jwtSecret = process.env.JWT_SECRET;
        if (!jwtSecret) {
            console.error("JWT secret not defined.");
            return res.status(500).json({ error: "Server error: JWT secret not defined." });
        }

        const decoded = jwt.verify(token, jwtSecret);
        req.user = decoded; // Attach the decoded token data to the request

        next();
    } catch (error) {
        console.error("JWT verification failed:", error);
        return res.status(401).json({ error: "Unauthorized: Invalid or expired token." });
    }
};

