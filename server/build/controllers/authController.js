"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logout = exports.login = exports.register = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const User_1 = __importDefault(require("../models/User"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
// Registration controller
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { fullName, username, gender, email, password } = req.body;
        // Normalize the email to avoid case sensitivity issues
        const normalizedEmail = email.trim().toLowerCase();
        // Check if the username or email already exists
        const existingUser = yield User_1.default.findOne({
            $or: [{ username }, { email: normalizedEmail }],
        });
        if (existingUser) {
            return res.status(400).json({ error: 'Username or email already exists' });
        }
        const hashedPassword = yield bcrypt_1.default.hash(password, 10);
        const user = new User_1.default({
            fullName,
            username,
            gender,
            email: normalizedEmail,
            password: hashedPassword,
        });
        yield user.save();
        res.status(201).json({ message: 'User registered successfully' });
    }
    catch (error) {
        console.error('Error during registration:', error);
        res.status(500).json({ error: 'Registration failed' });
    }
});
exports.register = register;
//login controller
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        const normalizedEmail = email.trim().toLowerCase();
        // Find the user by email
        const user = yield User_1.default.findOne({ email: normalizedEmail });
        if (!user) {
            return res.status(400).json({ error: 'Invalid email or password' });
        }
        // Verify the password
        const validPassword = yield bcrypt_1.default.compare(password, user.password); // Corrected line
        if (!validPassword) {
            return res.status(400).json({ error: 'Invalid email or password' });
        }
        // Create a JWT token
        const jwtSecret = process.env.JWT_SECRET;
        if (!jwtSecret) {
            return res.status(500).json({ error: 'Server error' });
        }
        const token = jsonwebtoken_1.default.sign({ userId: user._id, email: user.email }, jwtSecret, { expiresIn: '7d' });
        res.status(200).json({
            message: 'Login successful',
            Usertoken: token,
        });
    }
    catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ error: 'Login failed' });
    }
});
exports.login = login;
// Logout controller
const logout = (req, res) => {
    try {
        res.clearCookie('Usertoken'); // This removes the token from the client's cookies
        res.status(200).json({ message: 'Logout successful' }); // logout successs
    }
    catch (error) {
        console.error('Error during logout:', error);
        res.status(500).json({ error: 'Logout failed' });
    }
};
exports.logout = logout;
