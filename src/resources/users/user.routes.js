import express from 'express';
import userController from './user.controller.js';
import jwtauth from '../../middlewares/jwt.config.js';
const router = express.Router();


const UserController = new userController();
router.get('/', UserController.getUsers);
router.post('/signup', UserController.userSignUp);
router.post('/signin', UserController.userSignIn);

export default router;