import express from 'express';
import commentController from './comments.controller.js';
import jwtauth from '../../middlewares/jwt.config.js';
const router = express.Router();

const CommentController = new commentController()
router.get('/:postID', jwtauth, CommentController.getCommentsOnPost);
router.post('/:postID', jwtauth, CommentController.addNewComment);
router.delete('/:id', jwtauth, CommentController.deleteComment);
router.put('/:id', jwtauth, CommentController.updatedComment);

export default router;