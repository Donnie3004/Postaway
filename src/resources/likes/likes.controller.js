import LikesModel from "./likes.model.js";

export default class LikeController {
  getAllLikes(req, res){
    try {
      const {postID} = req.params;
      const all_likes= LikesModel.getAllLikesByPostID(postID);
      if(!all_likes){
        return res.status(404).json({
          success:false,
          message:`No likes present for post ${postID}`
        });
      }

      return res.status(200).json({
        success:false,
        data:all_likes
      })

    } catch (error) {
      console.error(error);
      return res.status(500).json({
        success:false,
        message:'Internal Server Error'
      });
    }
  }
  toggleLikes(req, res){
    try {
      const {postID} = req.params;
      const userId = req.user.id;
      const toggle_Status = LikesModel.toggleLikeStatus(postID, userId);
      if(toggle_Status === 'likeRemoved'){
        return res.status(200).json({
          success:true,
          message:'like removed'
        });
      } 
      
      return res.status(200).json({
        success:true,
        message:toggle_Status
      });
      
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        success:false,
        message:'Internal Server Error'
      });
    }
  }
}