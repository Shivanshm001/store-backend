import { Request, Response, NextFunction} from 'express';

import { body, query, validationResult } from 'express-validator';

export const validateProduct = [
    body('name').notEmpty(),
    body('category').notEmpty(),
    body('company').notEmpty(),
    body('featured').isBoolean(),
    body('rating').isNumeric(),
    body('price').isNumeric(),
    (req: Request, res: Response, next: NextFunction) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        return next();
    },
];
