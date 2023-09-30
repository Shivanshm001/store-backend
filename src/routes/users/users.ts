import express, { Router } from 'express';
import { router } from '../root/root';
import { getUserOfId, deleteUserOfId, updateUserOfId } from '../../controllers/users/usersController'


router.get("/", getUserOfId);
router.delete("/", deleteUserOfId)
router.put("/update", updateUserOfId)


export { router };