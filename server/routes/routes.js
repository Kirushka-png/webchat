import { Router } from "express";
import multer from 'multer';
import { userController } from "../controllers/user.controller.js";
import { authMiddleware } from '../middlewares/auth.middleware.js';
const upload = multer({ dest: 'uploads/' })

export const router = new Router()

router.post('/registration', userController.registration)
router.post('/login', userController.login)
router.post('/logout', userController.logout)
router.get('/refresh', userController.refresh)
router.get('/users', authMiddleware, userController.getUsers)
router.post('/changeAvatar', authMiddleware, upload.single('image'), userController.changeAvatar)
router.get('/chats', userController.getChats)