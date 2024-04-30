"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticateJWT = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
// Middleware to authenticate JWT tokens from "Authorization" header
const authenticateJWT = (req, res, next) => {
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
        const decoded = jsonwebtoken_1.default.verify(token, jwtSecret);
        req.user = decoded; // Attach the decoded token data to the request
        next();
    }
    catch (error) {
        console.error("JWT verification failed:", error);
        return res.status(401).json({ error: "Unauthorized: Invalid or expired token." });
    }
};
exports.authenticateJWT = authenticateJWT;
