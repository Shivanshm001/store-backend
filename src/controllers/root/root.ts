import { Request, Response } from 'express';

export function sendMessage(req: Request, res: Response){
    res.status(200).json({message: "Hey"})
}



export function reciveMessage(req: Request, res: Response) {
    if (req?.body) {
        res.status(200).json({ message: `Received ${JSON.stringify(req.body.message)}` });
        return;
    }
    res.status(500).json({ message: "No request body" });
}