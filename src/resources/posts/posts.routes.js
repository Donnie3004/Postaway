import express from 'express';
import postController from './posts.controller.js';
import jwtauth from '../../middlewares/jwt.config.js';
import uploadImage from '../../middlewares/imageUpload.js';
const router = express.Router();

const PostController = new postController()
router.get('/', jwtauth, PostController.retrivePostByUserLogin);
router.get('/all', jwtauth, PostController.retriveAllPost);
router.get('/datesorted', jwtauth, PostController.retriveAllPostDateWiseSorted);
router.get('/userengagementsorted', jwtauth, PostController.retriveAllPostUserEngagementWiseSorted);
router.get('/:id', jwtauth, PostController.retrivePostByID);
router.post('/', jwtauth, uploadImage.single('imageURL'), PostController.createPost);
router.delete('/:id', jwtauth, PostController.deletePost);
router.put('/archive/:id', PostController.archivingPost); 
router.put('/:id', jwtauth, uploadImage.single('imageURL'),PostController.updatePost);
router.post('/filterPost', jwtauth, PostController.getFilteredPost);
router.post('/draft', uploadImage.single('imageURL'), PostController.draftingPost); 

export default router;