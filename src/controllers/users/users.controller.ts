import { Request, Response } from "express";
import { UserModel as User } from '@/database/models/Users';

export async function getAllUsers(req: Request, res: Response) {
        try {
            const users = await User.find();
            res.status(200).json({users});
        } catch (error) {
            res.status(500).json({error});
        }   
}


export async function getUserOfId(req: Request, res: Response) {
    const { userId } = req.params;
    if (!userId) res.status(401).json({ error: "Invalid user id." });

    try {
        const user = await User.findOne({ userId });
        if (!user) res.status(404).json({ error: `${userId} does not exist.` });
        res.status(200).json({ user });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error });
    }
}


export async function deleteUserOfId(req: Request, res: Response) {
    const { userId } = req.params;
    if (!userId) {
        res.status(401).json({ error: "Invalid user id." });
        return;
    }

    try {
        const user = await User.findOneAndDelete({ userId });
        if (!user) res.status(404).json({ error: `${userId} does not exist.` });
        else res.status(200).json({ user }).end();
    } catch (error) {
        console.log(error);
        res.status(500).json({ error }).end();
    }
};


export async function updateUserOfId(req: Request, res: Response) {
    const { userId } = req.query;
    if (!userId) res.status(401).json({ error: "Invalid user id." });

    try {
        const user = await User.findOneAndUpdate({ userId });
        if (!user) res.status(404).json({ error: `${userId} does not exist.` });
        res.status(200).json({ user });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error });
    }
};

