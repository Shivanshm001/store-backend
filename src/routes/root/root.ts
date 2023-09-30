import express from 'express';
import { reciveMessage, sendMessage } from '../../controllers/root/rootController';

const router = express.Router();

router.route("/").get(sendMessage).post(reciveMessage);

export {
    router
}