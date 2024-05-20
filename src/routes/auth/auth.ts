import { handleUserLogin } from '@/controllers/auth/login.controller';
import { handleUserLogout } from '@/controllers/auth/logout.controller';
import { handleRefreshToken } from '@/controllers/auth/refreshToken.controller';
import { handleUserRegister } from '@/controllers/auth/register.controller';
import express, { Router } from 'express';

const router: Router = express.Router();

router.get("/refresh", handleRefreshToken);
router.get("/logout", handleUserLogout);
router.post("/login", handleUserLogin);
router.post("/register", handleUserRegister);
export { router };