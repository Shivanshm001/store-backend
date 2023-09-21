import { Request, Response, NextFunction } from 'express';

import { body, validationResult } from 'express-validator';
import { Categories } from '../enums/categories';
export const validateProduct = [
    body('name').notEmpty()
        .withMessage('Name is empty.')
        .isLength({ min: 3 })
        .withMessage("Name must be atleast 3 characters long."),

    body('category')
        .notEmpty()
        .withMessage('Category cannot be empty')
        .isIn(Object.values(Categories))
        .withMessage("Unknown category"),

    body('company')
        .notEmpty()
        .withMessage('Company cannot be empty.'),

    body('featured')
        .notEmpty()
        .withMessage("Featured cannot be null.")
        .isBoolean()
        .withMessage("Featured must be a boolean value."),

    body('rating')
        .notEmpty()
        .withMessage("Rating cannot be null.")
        .isInt({ min: 0, max: 10 })
        .withMessage("Rating must be an interger between 0 to 10."),

    body('price')
        .notEmpty()
        .withMessage("Price cannot be null.")
        .isFloat({ min: 0 })
        .withMessage("Price must be greater than 0."),


    (req: Request, res: Response, next: NextFunction) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        return next();
    },
];
