import {v4 as uuidv4} from 'uuid';

export default class LikesModel {
  constructor(_id, _userID, _postID){
    this.id = _id;
    this.userId = _userID;
    this.postId = _postID;
  }

  static getAllLikesByPostID(_postID){
    const all_likes = likes.filter(obj => obj.postId === _postID);
    return all_likes;
  }
  static toggleLikeStatus(_postID, _userID){
    const like_exists = likes.find(obj => obj.postId === _postID && obj.userId === _userID);
    if(like_exists){
      likes = likes.filter(obj => obj.id !== like_exists.id)
      return "likeRemoved";
    }else{
      const new_like = new LikesModel(uuidv4(), _userID, _postID);
      likes.push(new_like);
      return new_like;
    }
  }
}
var likes = [
  new LikesModel('mm2c0cb7-7664-223a-b386-8581298ea7aa', 'mm2c0cb7-8000-223a-b385-8581298ea7ff', 'mm2c0cb7-7664-223a-b386-8581298ea7ff'),
  new LikesModel('mm2c0cb7-7664-223a-b386-8581298ea7ab', 'mm2c0cb7-8001-223a-b385-8581298ea7ff', 'mm2c0cb7-7664-223a-b386-8581298ea7ff'),
  new LikesModel('mm2c0cb7-7664-223a-b386-8581298ea7ac', 'mm2c0cb7-8002-223a-b385-8581298ea7ff', 'mm2c0cb7-7664-223a-b386-8581298ea7ff'),
  new LikesModel('mm2c0cb7-7664-223a-b386-8581298ea7ad', 'mm2c0cb7-8003-223a-b385-8581298ea7ff', 'mm2c0cb7-7664-223a-b386-8581298ea7ff'),
];