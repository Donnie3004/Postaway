import express from 'express';
import jwtauth from '../../middlewares/jwt.config.js';
import likesController from './likes.controller.js';
const router = express.Router();

const LikesController = new likesController();
router.get('/toggle/:postID', jwtauth, LikesController.toggleLikes);
router.get('/:postID', jwtauth, LikesController.getAllLikes);

export default router;