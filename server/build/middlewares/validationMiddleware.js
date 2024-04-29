"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateLogin = exports.validateRegister = void 0;
const express_validator_1 = require("express-validator");
// Middleware to validate registration inputs
exports.validateRegister = [
    (0, express_validator_1.check)('fullName').notEmpty().withMessage('Full name is required'),
    (0, express_validator_1.check)('username').notEmpty().withMessage('Username is required'),
    (0, express_validator_1.check)('gender').isIn(['male', 'female', 'other']).withMessage('Invalid gender'),
    (0, express_validator_1.check)('email').isEmail().withMessage('Invalid email').trim().toLowerCase().normalizeEmail(),
    (0, express_validator_1.check)('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
    (req, res, next) => {
        const errors = (0, express_validator_1.validationResult)(req);
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
exports.validateLogin = [
    (0, express_validator_1.check)('email').isEmail().withMessage('Invalid email').trim().toLowerCase().normalizeEmail(),
    (0, express_validator_1.check)('password').notEmpty().withMessage('Password is required'),
    (req, res, next) => {
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                message: 'Validation failed. Please check your inputs.',
                errors: errors.array(),
            });
        }
        next();
    },
];
