import jwt, { JwtPayload, Secret } from 'jsonwebtoken';
import { NextFunction, Request, Response, Express } from "express";
import { config } from '@/config/config';

interface CustomRequest extends Request{
    username: string
}
interface DecodedPayload extends JwtPayload {
    username: string,
}

export function verifyJWT(req: Request, res: Response, next: NextFunction) {
    const authHeaders = req.headers['authorization'];

    if (!authHeaders) {
        res.sendStatus(401);
        return;
    }

    const token = authHeaders.split(" ")[1];

    jwt.verify(token, config.JWT_ACCESS_TOKEN_SECRET,
        (err, decoded) => {
            if (err || !decoded) {
                console.log("JWT verification failed.");
                console.log(err);
                res.sendStatus(403);
                return;
            }

            
            (req as CustomRequest).username = (decoded as DecodedPayload).username;
            next();
        }
    );
}