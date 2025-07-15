import PostModel from "./posts.model.js";

export default class PostController {
  retriveAllPost(req, res){
    try {
      const posts = PostModel.getAllPosts();
      if(!posts){
        return res.status(404).json({
          success:false,
          message:"No data found"
        });
      }

      return res.status(200).json({
        success:true,
        data:posts
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        success:false,
        message:"Internal Server Error"
      });
    }
  }
  retrivePostByID(req, res){
    try {
      const {id} = req.params;
      const post = PostModel.getPostByPostID(id);
      if(!post){
        return res.status(404).json({
          success:false,
          message:"No data found"
        });
      }

      return res.status(200).json({
        success:true,
        data:post
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        success:false,
        message:"Internal Server Error"
      });
    }
  }
  retrivePostByUserLogin(req, res){
    try {
      const user_obj = req.user;
      console.log(user_obj);
      const allUserPost = PostModel.getPostByUserLogin(user_obj);
      if(!allUserPost){
        return res.status(404).json({
          success:false,
          message:"No Post found"
        });
      }
      return res.status(200).json({
        success:true,
        data:allUserPost
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        success:false,
        message:"Internal Server Error"
      });
    }
  }
  createPost(req, res){
    try {
      const {caption} = req.body;
      const ImageURL = `http://localhost:3000/images/${req.file.filename}`;
      const userID = req.user.id;

      const post_created = PostModel.newPostCreation({userID:userID, caption:caption, imageURL:ImageURL});

      if(!post_created){
        return res.status(404).json({
          success:false,
          message:"No Post found"
        });
      }
      return res.status(200).json({
        success:true,
        data:post_created
      });
      
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        success:false,
        message:"Internal Server Error"
      });
    }
  }
  deletePost(req, res){
    try {
      const {id} = req.params;
      const check_post_exists = PostModel.getPostByPostID(id);
      
      if(!check_post_exists){
        return res.status(404).json({
          success:false,
          message:`No post exists for post ID ${id}`
        });
      }

      const deleted_post = PostModel.deletePost(id); 

      if(!deleted_post){
        return res.status(404).json({
          success:false,
          message:`PostID : ${id} does not exists`
        });
      }
      return res.status(200).json({
        success:true,
        message:'post deleted',
        data:deleted_post
      });

    } catch (error) {
      console.error(error);
      return res.status(500).json({
        success:false,
        message:"Internal Server Error"
      });
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
        return res.status(404).json({
          success:false,
          message:"No Post found"
        });
      }
      return res.status(200).json({
        success:true,
        data:post_updated
      });

    } catch (error) {
      console.error(error);
      return res.status(500).json({
        success:false,
        message:"Internal Server Error"
      });
    }
  }
}