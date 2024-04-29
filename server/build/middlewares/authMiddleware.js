"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticateJWT = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
// Middleware to authenticate JWT tokens
const authenticateJWT = (req, res, next) => {
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
        const decoded = jsonwebtoken_1.default.verify(token, jwtSecret);
        req.user = decoded;
        next(); // Token is valid, proceed to the next middleware
    }
    catch (error) {
        console.error('JWT verification failed:', error);
        return res.status(401).json({ error: 'Invalid token. Please log in again.' });
    }
};
exports.authenticateJWT = authenticateJWT;
