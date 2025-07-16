import { v4 as uuidv4 } from 'uuid';

export default class BookmarkModel {
  constructor(_id, _postId, _userId){
    this.id = _id;
    this.userId = _userId;
    this.postId = _postId;
  }

  static getAllBookmark(userId){
    const user_bookmarks = bookmarks.filter(obj => obj.userId === userId);
    return user_bookmarks;
  }

  static toggleBookmark(postId, userId){
    const bookmark_exists = bookmarks.find(obj => obj.postId === postId && obj.userId === userId);
      if(bookmark_exists){
        bookmarks = bookmarks.filter(obj => obj.id !== like_exists.id)
        return "bookmark removed";
      }else{
        const new_bookmark = new BookmarkModel(uuidv4(), postId, userId);
        bookmarks.push(new_bookmark);
        return new_bookmark;
      }
  }
}

var bookmarks = [];