import CommentsModel from "./comments.model.js";

export default class CommentController {
  getCommentsOnPost(req, res){
    try {
      const {postID} = req.params;
      const all_comments = CommentsModel.getCommentsByPostID(postID);
      if(!all_comments){
        return res.status(404).json({
          success:false,
          message:'No comments in post'
        });
      }
      return res.status(200).json({
        success:true,
        comments:all_comments
      })
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        success:false,
        message:'Internal Server Error'
      });
    }
  }

  addNewComment(req, res){
    try {
      const {content} = req.body;
      const {postID} = req.params;
      const userId = req.user.id;

      const comment_added = CommentsModel.addNewComment({userId:userId, postId:postID, content:content});

      if(!comment_added){
        return res.status(404).json({
          success:false,
          message:'No able to add comment, kindly check credentials'
        });
      }
      return res.status(200).json({
        success:true,
        comments:comment_added
      });

    } catch (error) {
      
    }

  }

  deleteComment(req, res){
    try {
      const {id} = req.params;

      const delete_comment = CommentsModel.deleteComment(id);

      if(!delete_comment){
        return res.status(404).json({
          success:false,
          message:'No comments to delete'
        });
      }
      return res.status(200).json({
        success:true,
        comments:delete_comment
      })

    } catch (error) {
      
    }
  }

  updatedComment(req, res){
    try {
      const {content} = req.body;
      const {id} = req.params;

      const comment_updated = CommentsModel.updateComment({id:id, content:content});

      if(!comment_updated){
        return res.status(404).json({
          success:false,
          message:'No comments to updated'
        });
      }
      return res.status(200).json({
        success:true,
        comments:comment_updated
      });
    } catch (error) {
      
    }

  }

}