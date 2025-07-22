import CustomError from "../../utils/customError.js";
import Pagination from "../../utils/pagination.js";
import PostModel from "./posts.model.js";
import Sorting from "../../utils/sortingPost.js";

export default class PostController {
  retriveAllPost(req, res, next){
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
      next(error);
    }
  }

  retriveAllPostDateWiseSorted(req, res, next){
    try {
      const {page, limit} = req.query;     

      const posts = PostModel.getAllPosts();
      if(!posts){
        throw new CustomError("No post found", 400);
      }

      // this will bring all the 
      const date_sorted_post = Sorting.dateBasis(posts);

      const paginationObj = new Pagination();
      const paginatedPost = paginationObj.doPagination(date_sorted_post, page, limit);

      return res.status(200).json({
        success:true,
        data:paginatedPost
      });
    } catch (error) {
      next(error);
    }
  }

  retriveAllPostUserEngagementWiseSorted(req, res, next){
    try {
      const {page, limit} = req.query;     

      const posts = PostModel.getAllPosts();
      if(!posts){
        throw new CustomError("No post found", 400);
      }

      // this will bring all the 
      const userEngagement_sorted_post = Sorting.userEngagementBasis(posts);

      const paginationObj = new Pagination();
      const paginatedPost = paginationObj.doPagination(userEngagement_sorted_post, page, limit);

      return res.status(200).json({
        success:true,
        data:paginatedPost
      });
    } catch (error) {
      next(error);
    }
  }

  retrivePostByID(req, res, next){
    try {
      const {id} = req.params;
      const post = PostModel.getPostByPostID(id);
      if(!post){
        throw new CustomError("No post found", 400);
      }
      return res.status(200).json({
        success:true,
        data:post
      });
    } catch (error) {
      next(error);
    }
  }

  retrivePostByUserLogin(req, res, next){
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
      next(error);
    }
  }

  createPost(req, res, next){
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
      next(error);
    }
  }

  deletePost(req, res, next){
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
      next(error);
    }
  }

  updatePost(req, res, next){
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
      next(error);
    }
  }

  draftingPost(req, res, next){
    try {
      const {caption} = req.body;
      const ImageURL = `http://localhost:3000/images/${req.file.filename}` || null;
      const userID = req.user.id;

      const drafting_result = PostModel.draftPost({userID:userID, caption:caption, imageURL:ImageURL})

      if(!drafting_result){
        throw new CustomError("No post found", 404);
      }

      return res.status(200).json({
        success:true,
        data:drafting_result
      });
    } catch (error) {
      next(error);
    }
  }

  archivingPost(req, res, next){
    try {
      const {postId} = req.params;
      const userID = req.user.id;
      const result = PostModel.archievePost(postId,userID);
      if (!result){
        throw new CustomError("Post not found.", 404);
      }
      return res.status(200).json({
        success:true,
        data:drafting_result
      });
    } catch (error) {
      next(error);
    }
  }

  getFilteredPost(req, res, next){
    try {
      const {caption} = req.body;
      const userID = req.user.id;

      const filtered_Caption_Post = PostModel.filterCaption(caption, userID);

      if(!filtered_Caption_Post){
        throw new CustomError("No post with the given filter", 404);
      }

      return res.status(200).json({
        success:true,
        data:filtered_Caption_Post
      });
      
    } catch (error) {
      next(error);
    }
  }
}