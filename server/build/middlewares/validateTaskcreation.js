"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateCreateTask = void 0;
const express_validator_1 = require("express-validator");
// Validation middleware for creating a task
exports.validateCreateTask = [
    (0, express_validator_1.check)('name').notEmpty().withMessage('Task name is required'),
    (0, express_validator_1.check)('description').notEmpty().withMessage('Task description is required'),
    (0, express_validator_1.check)('assignedTo').isIn(['personal', 'others']).withMessage('Invalid assignment type'),
    (0, express_validator_1.check)('assigneeEmail')
        .if((value, { req }) => req.body.assignedTo === 'others')
        .isEmail()
        .withMessage('Invalid email format for assignee'), // Validate email for "others" assignment
    (req, res, next) => {
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                message: 'Validation failed. Please check your inputs.',
                errors: errors.array(), // Return validation errors
            });
        }
        next(); // If no validation errors, proceed to the next middleware/controller
    },
];
