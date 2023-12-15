import { Request, Response, NextFunction } from 'express';

import { body, validationResult } from 'express-validator';

// userId
// username
// password
// refreshToken
// wishlist
// cart
// role
export const validateProduct = [
    body('userId').notEmpty()
        .withMessage('UserId is empty.')
        .isLength({ min: 16 })
        .withMessage("UserId must be atleast 16 characters long."),

    body('username')
        .notEmpty()
        .withMessage('username cannot be empty'),

    body('password')
        .notEmpty()
        .withMessage('Password cannot be empty.')
        .isLength({ min: 8 })
        .withMessage('Minimum password length should not be less than 8 characters.'),

    body('refreshToken')
        .notEmpty()
        .withMessage("Refresh token cannot be empty")
        .isLength({ min: 16 }),

    body('wishlist')
        .isArray()
        .withMessage("Wishlist should be an array."),

    body('cart')
        .isArray()
        .withMessage("Wishlist should be an array."),

    body('role')
        .isIn(["user", "admin"])
        .default("user")
        .withMessage("Role should be user or admin."),

    (req: Request, res: Response, next: NextFunction) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        return next();
    },
];
