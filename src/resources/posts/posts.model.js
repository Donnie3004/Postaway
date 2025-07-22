import { v4 as uuidv4 } from 'uuid';

export default class PostModel {
  constructor(_id, _userID, _caption, _imageURL, _status, _createdAt) {
    this.id = _id;
    this.userID = _userID;
    this.caption = _caption;
    this.imageURL = _imageURL;
    this.status = _status;
    this.createdAt = _createdAt;
  }

  static getAllPosts(){
    return posts;
  }

  static getPostByPostID(_id){
    const post = posts.find(obj=>obj.id === _id);
    return post;
  }

  static getPostByUserLogin(user_obj){
    const user_posts = posts.filter(obj => obj.userID === user_obj.id);
    return user_posts; 
  }

  static newPostCreation(postObj){
    const new_post = new PostModel(uuidv4(), postObj.userID, postObj.caption, postObj.imageURL, "published", new Date().toISOString());
    posts.push(new_post);
    return new_post;
  }

  static draftPost(postObj){
    const new_post = new PostModel(uuidv4(), postObj.userID, postObj.caption, postObj.imageURL, "draft", new Date().toISOString());
    posts.push(new_post);
    return new_post;
  }

  static archievePost(_postid, _userID){
    const post_found = posts.find(obj => obj.id === _postid);
    if(post_found && post_found.userID === _userID){
      post_found.status = 'archieve';
      return post_found;
    }
    return post_found;
  }

  static deletePost(_id){
    let post = posts.find(obj => obj.id === _id);
    if(!post){
      return post;
    }
    posts = posts.filter(obj => obj.id !== _id); 
    return post;
  }

  static updatePost(updateObj){
    let post = this.getPostByPostID(updateObj.id);
    if(!post){
      return post;
    }
    post.caption = updateObj.caption;
    post.imageURL = updateObj.imageURL;
    post.userID = updateObj.userID;
    return post;
  }

  static filterCaption(_caption, _userId){
    let caption_post = posts.find(obj=> obj.userID === _userId && obj.caption === _caption);
    return caption_post;
  }

}

var posts = [
  new PostModel('97fb46c3-62e8-4248-9fd9-a99fa0ae644d', 'mm2c0cb7-8000-223a-b385-8581298ea7ff', "PostDEF", "http://localhost:3000/images/c5d7d63a-d042-4160-a023-45576961e32a_chart paper.jpg", "published", '2025-07-22T20:43:55.451Z'),
  new PostModel('e737deaa-bab8-42c0-8ee1-57fce21bffbd', 'mm2c0cb7-8000-223a-b385-8581298ea7ff', "postABC", "http://localhost:3000/images/9dba5afb-0f69-41e6-b432-08123fa58ff0_arbaz.jpeg", "published", '2025-07-21T19:43:55.451Z'),
  new PostModel('e737deaa-bab8-42c0-8ee1-57fce21bffbe', 'mm2c0cb7-8000-223a-b385-8581298ea7ff', "postMNO", "http://localhost:3000/images/9dba5afb-0f69-41e6-b432-08123fa58ff0_arbaz.jpeg", "published", '2025-07-20T18:43:55.451Z'),
  new PostModel('e737deaa-bab8-42c0-8ee1-57fce21bffbf', 'mm2c0cb7-8000-223a-b385-8581298ea7ff', "postXYZ", "http://localhost:3000/images/9dba5afb-0f69-41e6-b432-08123fa58ff0_arbaz.jpeg", "published", '2025-07-19T17:43:55.451Z'),
  new PostModel('e737deaa-bab8-42c0-8ee1-57fce21bffbg', 'mm2c0cb7-8000-223a-b385-8581298ea7ff', "postaaa", "http://localhost:3000/images/9dba5afb-0f69-41e6-b432-08123fa58ff0_arbaz.jpeg", "published", '2025-07-18T16:43:55.451Z'),
  new PostModel('e737deaa-bab8-42c0-8ee1-57fce21bffbh', 'mm2c0cb7-8000-223a-b385-8581298ea7ff', "postbbb", "http://localhost:3000/images/9dba5afb-0f69-41e6-b432-08123fa58ff0_arbaz.jpeg", "published", '2025-07-17T15:43:55.451Z'),
  new PostModel('e737deaa-bab8-42c0-8ee1-57fce21bffbi', 'mm2c0cb7-8000-223a-b385-8581298ea7ff', "postccc", "http://localhost:3000/images/9dba5afb-0f69-41e6-b432-08123fa58ff0_arbaz.jpeg", "published", '2025-07-16T14:43:55.451Z'),
  new PostModel('e737deaa-bab8-42c0-8ee1-57fce21bffbj', 'mm2c0cb7-8000-223a-b385-8581298ea7ff', "postddd", "http://localhost:3000/images/9dba5afb-0f69-41e6-b432-08123fa58ff0_arbaz.jpeg", "published", '2025-07-15T13:43:55.451Z'),
  new PostModel('e737deaa-bab8-42c0-8ee1-57fce21bffbk', 'mm2c0cb7-8000-223a-b385-8581298ea7ff', "posteee", "http://localhost:3000/images/9dba5afb-0f69-41e6-b432-08123fa58ff0_arbaz.jpeg", "published", '2025-07-14T12:43:55.451Z'),
  new PostModel('e737deaa-bab8-42c0-8ee1-57fce21bffbl', 'mm2c0cb7-8000-223a-b385-8581298ea7ff', "postfff", "http://localhost:3000/images/9dba5afb-0f69-41e6-b432-08123fa58ff0_arbaz.jpeg", "published", '2025-07-13T11:43:55.451Z'),
  new PostModel('e737deaa-bab8-42c0-8ee1-57fce21bffbm', 'mm2c0cb7-8000-223a-b385-8581298ea7ff', "postggg", "http://localhost:3000/images/9dba5afb-0f69-41e6-b432-08123fa58ff0_arbaz.jpeg", "published", '2025-07-12T10:43:55.451Z'),
];