import { check, validationResult } from 'express-validator';
import { Request, Response, NextFunction } from 'express';

// Middleware to validate registration inputs
export const validateRegister = [
    check('fullName').notEmpty().withMessage('Full name is required'),
    check('username').notEmpty().withMessage('Username is required'),
    check('gender').isIn(['male', 'female', 'other']).withMessage('Invalid gender'),
    check('email').isEmail().withMessage('Invalid email').trim().toLowerCase().normalizeEmail(),
    check('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
    (req: Request, res: Response, next: NextFunction) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                message: 'Validation failed. Please check your inputs.',
                errors: errors.array(),
            });
        }
        next();
    },
];

// Middleware to validate login inputs
export const validateLogin = [
    check('email').isEmail().withMessage('Invalid email').trim().toLowerCase().normalizeEmail(),
    check('password').notEmpty().withMessage('Password is required'),
    (req: Request, res: Response, next: NextFunction) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                message: 'Validation failed. Please check your inputs.',
                errors: errors.array(),
            });
        }
        next();
    },
];
