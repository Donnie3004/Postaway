import {v4 as uuidv4} from 'uuid';

export default class CommentsModel{
  constructor(_id, _userId, _postId, _content){
    this.id = _id;
    this.userId = _userId;
    this.postId = _postId;
    this.content = _content;
  }

  static getCommentsByPostID(_postId){
    const post_comments = comments.filter(obj => obj.postId === _postId);
    return post_comments;
  }

  static addNewComment(comment_obj){
    const new_comment = new CommentsModel(uuidv4(), comment_obj.userId, comment_obj.postId, comment_obj.content);
    comments.push(new_comment);
    return new_comment;
  }

  static getCommentObjByCommentID(_commentID){
    const comment_found = comments.find(obj => obj.id === _commentID);
    return comment_found;
  }

  static deleteComment(_commentID){
    const comment_exists = this.getCommentObjByCommentID(_commentID);
    if(!comment_exists){
      return comment_exists;
    }

    comments = comments.filter(obj => obj.id !== _commentID);
    return comment_exists;
  }

  static updateComment(comment_obj){
    const comment_exists = this.getCommentObjByCommentID(comment_obj.id)
    if(!comment_exists){
      return comment_exists;
    }
    comment_exists.content = comment_obj.content;
    return comment_exists;
  } 
}

var comments = [
  new CommentsModel('mm2c0cb7-7664-230a-b386-8581298ea7ff', 'mm2c0cb7-8000-223a-b385-8581298ea7ff', 'mm2c0cb7-7664-223a-b386-8581298ea7ff', 'this is comment from arbaz'),
  new CommentsModel('mm2c0cb7-7664-231a-b386-8581298ea7ff', 'mm2c0cb7-8001-223a-b385-8581298ea7ff', 'mm2c0cb7-7664-223a-b386-8581298ea7ff', 'this is comment from donnie'),
  new CommentsModel('mm2c0cb7-7664-232a-b386-8581298ea7ff', 'mm2c0cb7-8002-223a-b385-8581298ea7ff', 'mm2c0cb7-7664-223a-b386-8581298ea7ff', 'this is comment from sheikh'),
  new CommentsModel('mm2c0cb7-7664-233a-b386-8581298ea7ff', 'mm2c0cb7-8003-223a-b385-8581298ea7ff', 'mm2c0cb7-7664-223a-b386-8581298ea7ff', 'this is comment from rehman')
];