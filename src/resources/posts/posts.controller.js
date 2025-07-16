import CustomError from "../../utils/customError.js";
import Pagination from "../../utils/pagination.js";
import PostModel from "./posts.model.js";

export default class PostController {
  retriveAllPost(req, res){
    try {
      const {page, limit} = req.query;     

      const posts = PostModel.getAllPosts();
      if(!posts){
        throw new CustomError("No post found", 400);
      }

      const paginationObj = new Pagination();
      const paginatedPost = paginationObj.doPagination(posts, page, limit);

      return res.status(200).json({
        success:true,
        data:paginatedPost
      });
    } catch (error) {
      throw new CustomError();
    }
  }

  retrivePostByID(req, res){
    try {
      const {id} = req.params;
      const {page, limit} = req.query;
      const post = PostModel.getPostByPostID(id);
      if(!post){
        throw new CustomError("No post found", 400);
      }

      const paginationObj = new Pagination();
      const paginatedPost = paginationObj.doPagination(post, page, limit);

      return res.status(200).json({
        success:true,
        data:paginatedPost
      });
    } catch (error) {
      throw new CustomError();
    }
  }

  retrivePostByUserLogin(req, res){
    try {
      const user_obj = req.user;
      console.log(user_obj);
      const {page, limit} = req.query;
      const allUserPost = PostModel.getPostByUserLogin(user_obj);
      if(!allUserPost){
        throw new CustomError("No post found", 400);
      }

      const paginationObj = new Pagination();
      const paginatedPost = paginationObj.doPagination(allUserPost, page, limit);

      return res.status(200).json({
        success:true,
        data:paginatedPost
      });
    } catch (error) {
      throw new CustomError();
    }
  }

  createPost(req, res){
    try {
      const {caption} = req.body;
      const ImageURL = `http://localhost:3000/images/${req.file.filename}`;
      const userID = req.user.id;

      const post_created = PostModel.newPostCreation({userID:userID, caption:caption, imageURL:ImageURL});
      if(!post_created){
        throw new CustomError("No post found", 400);
      }
      return res.status(200).json({
        success:true,
        data:post_created
      });
    } catch (error) {
      throw new CustomError();
    }
  }

  deletePost(req, res){
    try {
      const {id} = req.params;
      const check_post_exists = PostModel.getPostByPostID(id);
      
      if(!check_post_exists){
        throw new CustomError(`PostID : ${id} does not exists`, 404);
      }

      const deleted_post = PostModel.deletePost(id); 

      return res.status(200).json({
        success:true,
        message:'post deleted',
        data:deleted_post
      });

    } catch (error) {
      throw new CustomError();
    }
  }

  updatePost(req, res){
    try {
      const {caption} = req.body;
      const ImageURL = `http://localhost:3000/images/${req.file.filename}`;
      const {id} = req.params;
      const userID = req.user.id;

      const post_updated = PostModel.updatePost({id:id, userID:userID, caption:caption, imageURL:ImageURL});

      if(!post_updated){
        throw new CustomError("No post found", 404);
      }
      return res.status(200).json({
        success:true,
        data:post_updated
      });

    } catch (error) {
      throw new CustomError();
    }
  }
}