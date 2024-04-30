import { Request, Response } from 'express';
import dotenv from 'dotenv';
dotenv.config();
import User from '../models/User';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

// Registration controller
export const register = async (req: Request, res: Response) => {
    try {
        const { fullName, username, gender, email, password } = req.body;
        // Normalize the email to avoid case sensitivity issues
        const normalizedEmail = email.trim().toLowerCase();

        // Check if the username or email already exists
        const existingUser = await User.findOne({
            $or: [{ username }, { email: normalizedEmail }],
        });

        if (existingUser) {
            return res.status(400).json({ error: 'Username or email already exists' });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({
            fullName,
            username,
            gender,
            email: normalizedEmail,
            password: hashedPassword,
        });
        await user.save();
        res.status(201).json({ message: 'User registered successfully' });

    } catch (error) {
        console.error('Error during registration:', error);
        res.status(500).json({ error: 'Registration failed' });
    }
};


export const login = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;
        const normalizedEmail = email.trim().toLowerCase();

        // Find the user by email
        const user = await User.findOne({ email: normalizedEmail });
        if (!user) {
            return res.status(400).json({ error: 'Invalid email or password' });
        }

        // Verify the password
        const validPassword = await bcrypt.compare(password, user.password); // Corrected line
        if (!validPassword) {
            return res.status(400).json({ error: 'Invalid email or password' });
        }

        // Create a JWT token
        const jwtSecret = process.env.JWT_SECRET;
        if (!jwtSecret) {
            return res.status(500).json({ error: 'Server error' });
        }

        const token = jwt.sign(
            { userId: user._id, email: user.email },
            jwtSecret,
            { expiresIn: '7d' } // Token expires in 7 days
        );

        // Send the token in the response body with a specific key
        res.status(200).json({
            message: 'Login successful',
            Usertoken: token, // Include the JWT token with the key 'Usertoken'
        });
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ error: 'Login failed' });
    }
};

// Logout controller
export const logout = (req: Request, res: Response) => {
    try {
        res.clearCookie('Usertoken'); // This removes the token from the client's cookies

        res.status(200).json({ message: 'Logout successful' }); // logout successs
    } catch (error) {
        console.error('Error during logout:', error);
        res.status(500).json({ error: 'Logout failed' });
    }
};