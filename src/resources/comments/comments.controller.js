import CustomError from "../../utils/customError.js";
import Pagination from "../../utils/pagination.js";
import CommentsModel from "./comments.model.js";

export default class CommentController {
  getCommentsOnPost(req, res){
    try {
      const {postID} = req.params;
      const {page, limit} = req.query;
      const all_comments = CommentsModel.getCommentsByPostID(postID);
      if(!all_comments){
        throw new CustomError('No comments in post', 400);
      }

      const paginationObj = new Pagination();
      const paginatedComments = paginationObj.doPagination(all_comments, page, limit);

      return res.status(200).json({
        success:true,
        comments:paginatedComments
      })
    } catch (error) {
      throw new CustomError();
    }
  }

  addNewComment(req, res){
    try {
      const {content} = req.body;
      const {postID} = req.params;
      const userId = req.user.id;

      const comment_added = CommentsModel.addNewComment({userId:userId, postId:postID, content:content});

      if(!comment_added){
        throw new CustomError('No able to add comment, kindly check credentials', 404);
      }
      return res.status(200).json({
        success:true,
        comments:comment_added
      });

    } catch (error) {
      throw new CustomError();
    }
  }

  deleteComment(req, res){
    try {
      const {id} = req.params;

      const delete_comment = CommentsModel.deleteComment(id);

      if(!delete_comment){
        throw new CustomError('No comments to delete', 404);
      }
      return res.status(200).json({
        success:true,
        comments:delete_comment
      })

    } catch (error) {
      throw new CustomError();
    }
  }

  updatedComment(req, res){
    try {
      const {content} = req.body;
      const {id} = req.params;

      const comment_updated = CommentsModel.updateComment({id:id, content:content});

      if(!comment_updated){
        throw new CustomError('No comments to updated', 404);
      }
      return res.status(200).json({
        success:true,
        comments:comment_updated
      });
    } catch (error) {
      throw new CustomError();
    }

  }

}