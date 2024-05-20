import { Request, Response, CookieOptions } from "express";
import { verifyJWT } from "@/middleware/verifyJWT";
import jwt, { VerifyErrors, JwtPayload } from 'jsonwebtoken';
import { UserModel as User } from "@/database/models/Users";
import { config } from "@/config/config";



export async function handleRefreshToken(req: Request, res: Response) {
    const cookies = req.cookies;
    if (!cookies?.jwt) {
        res.sendStatus(401); //Unauthorized
        return;
    }

    const refreshToken = cookies.jwt;

    try {
        const foundUser = await User.findOne({ refreshToken });
        if (!foundUser) {
            res.sendStatus(403); 
            return;
        }

        jwt.verify(refreshToken, config.JWT_REFRESH_TOKEN_SECRET,
            (err: any, decoded: any) => {
                if (err || !decoded) {
                    res.sendStatus(403);
                    return;
                }
                if (foundUser.username !== decoded.username) {
                    res.sendStatus(403);
                    return;
                }

                const accessToken = jwt.sign(
                    { username: decoded.username },
                    config.JWT_ACCESS_TOKEN_SECRET,
                    { expiresIn: "2min" }
                );

                res.status(200).json({ accessToken })
            }
        );
    } catch (error) {
        console.log(error);
        res.status(403).json({ error });
    }
}