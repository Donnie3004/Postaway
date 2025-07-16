import express from 'express';
import jwtauth from '../../middlewares/jwt.config.js';
import bookmarkController from './bookmark.controller.js';
const router = express.Router();

const BookmarkController = new bookmarkController();
router.get('/toggle/:postID', jwtauth, BookmarkController.toggleBookmark);
router.get('/', jwtauth, BookmarkController.getAllBookmarks);

export default router;