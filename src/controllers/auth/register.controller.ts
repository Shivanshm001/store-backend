import bcrypt from 'bcrypt';
import { randomBytes } from "crypto";
import { Request, Response } from "express";

import { UserModel as User } from "@/database/models/Users";


export async function handleUserRegister(req: Request, res: Response) {
    const { username, password, role } = req.body;
    if (!username || !password) {
        res.status(400).json({ error: "Username and password are required." });
        return;
    }

    try {
        const duplicateUsername = await User.findOne({ username });
        if (duplicateUsername) {
            res.sendStatus(409);
            return;
        }

        const hashPassword = await bcrypt.hash(password, 10);
        const userId = randomBytes(16).toString('hex');
        let newUser;
        if (role) {
            newUser = new User({ userId, username, password: hashPassword, role });
        } else {
            newUser = new User({ userId, username, password: hashPassword });
        }
        await newUser.save();

        res.sendStatus(201);

    } catch (error) {
        console.log(error);
        res.status(500).json({ error });
    }
};



