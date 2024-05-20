import { Request, Response } from "express";
import { UserModel as User } from "@/database/models/Users";

export async function handleUserLogout(req: Request, res: Response) {

    const cookies = req.cookies;

    if (!cookies?.jwt) {
        res.sendStatus(204);
        return;
    }

    const refreshToken = cookies.jwt;

    try {
        const foundUser = await User.findOne({ refreshToken });
        if (!foundUser) {
            res.clearCookie('jwt', { httpOnly: true, sameSite: "none", })
            res.sendStatus(204);
            return;
        }

        await User.updateOne({ refreshToken: foundUser.refreshToken }, { refreshToken: " " });
        res.clearCookie('jwt', { httpOnly: true, sameSite: "none" });
        res.sendStatus(204);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error });
    }

}