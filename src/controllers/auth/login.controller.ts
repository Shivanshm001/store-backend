import bcrypt from 'bcrypt';
import { Request, Response } from "express";
import jwt from 'jsonwebtoken';

import { config } from '../../config/config';
import { UserModel as User } from "../../database/models/Users";


export async function handleUserLogin(req: Request, res: Response) {
    const { username, password } = req.body;
    if (!username || !password) {
        res.status(400).json({ error: "Username and password are required." });
        return;
    }
    try {
        const foundUser = await User.findOne({ username });
        if (!foundUser) {
            res.status(404).json({ error: "User not found." });
            return;
        }

        const match = await bcrypt.compare(password, foundUser.password);
        if (match) {
            const accessToken = jwt.sign(
                { username: foundUser.username },
                config.JWT_ACCESS_TOKEN_SECRET,
                { expiresIn: "2min" })


            const refreshToken = jwt.sign(
                { username: foundUser.username },
                config.JWT_REFRESH_TOKEN_SECRET,
                { expiresIn: "1d" }
            )

            const user = await User.findOneAndUpdate({ username: foundUser.username }, { refreshToken }, { new: true });
            const oneDayInMilliseconds = (24 * 60 * 60 * 1000);
            res.cookie('jwt', refreshToken, { httpOnly: true, sameSite: "none", maxAge: oneDayInMilliseconds });
            res.status(200).json({ accessToken });
        } else {
            res.sendStatus(401);
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ error });
    }
}
