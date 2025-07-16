import CustomError from "../../utils/customError.js";
import BookmarkModel from "./bookmark.model.js";

export default class BookmarkController {

  getAllBookmarks(req, res){
    try {
      const userId = req.user.id;
      const all_bookmark= BookmarkModel.getAllBookmark(userId);
      if(!all_bookmark){
        throw new CustomError(`No bookmark present for post`, 400);
      }
      return res.status(200).json({
        success:false,
        data:all_bookmark
      })
    } catch (error) {
      throw new CustomError();
    }
  }

  toggleBookmark(req, res){
    try {
      const {postID} = req.params;
      const userId = req.user.id;
      const toggle_Status = BookmarkModel.toggleBookmark(postID, userId);
      if(toggle_Status === 'bookmark removed'){
        return res.status(200).json({
          success:true,
          message:toggle_Status
        });
      } 
      return res.status(200).json({
        success:true,
        message:toggle_Status
      });  
    } catch (error) {
      throw new CustomError();
    }
  }
}
