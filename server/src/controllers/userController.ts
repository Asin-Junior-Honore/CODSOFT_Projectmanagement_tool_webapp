import { Response } from 'express';
import jwt from 'jsonwebtoken';
import { AuthenticatedRequest } from '../middlewares/authMiddleware';
import User from '../models/User';

// Controller to fetch the user profile
export const fetchUserProfile = async (req: AuthenticatedRequest, res: Response) => {
    try {
        // Check if the request has a valid JWT and user information
        if (!req.user || typeof req.user === 'string') {
            return res.status(401).json({ error: 'Unauthorized access.' });
        }
        const userId = (req.user as jwt.JwtPayload).userId;
        const user = await User.findById(userId).select('-password');
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.status(200).json(user);
    } catch (error) {
        console.error('Error fetching user profile:', error);
        res.status(500).json({ error: 'Server error' });
    }
};
