import express, { Router } from 'express';
import { router } from '@/routes/root/root';
import { getUserOfId, deleteUserOfId, updateUserOfId, getAllUsers } from '@/controllers/users/users.controller'

router.get("/all", getAllUsers)
router.get("/:userId", getUserOfId);
router.delete("/:userId", deleteUserOfId)
router.put("/update/:userId", updateUserOfId)


export { router };