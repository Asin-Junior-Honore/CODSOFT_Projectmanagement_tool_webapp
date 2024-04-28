import { check, validationResult } from 'express-validator';
import { Request, Response, NextFunction } from 'express';

// Validation middleware for creating a task
export const validateCreateTask = [
    check('name').notEmpty().withMessage('Task name is required'), 
    check('description').notEmpty().withMessage('Task description is required'),
    check('assignedTo').isIn(['personal', 'others']).withMessage('Invalid assignment type'),
    check('assigneeEmail')
        .if((value, { req }) => req.body.assignedTo === 'others')
        .isEmail()
        .withMessage('Invalid email format for assignee'), // Validate email for "others" assignment
    (req: Request, res: Response, next: NextFunction) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                message: 'Validation failed. Please check your inputs.',
                errors: errors.array(), // Return validation errors
            });
        }
        next(); // If no validation errors, proceed to the next middleware/controller
    },
];
