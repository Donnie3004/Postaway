import { v4 as uuidv4 } from 'uuid';

export default class PostModel {
  constructor(_id, _userID, _caption, _imageURL) {
    this.id = _id;
    this.userID = _userID;
    this.caption = _caption;
    this.imageURL = _imageURL;
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
    const new_post = new PostModel(uuidv4(), postObj.userID, postObj.caption, postObj.imageURL);
    posts.push(new_post);
    return new_post;
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
}

var posts = [
  new PostModel('97fb46c3-62e8-4248-9fd9-a99fa0ae644d', 'mm2c0cb7-8000-223a-b385-8581298ea7ff', "Post1", "http://localhost:3000/images/c5d7d63a-d042-4160-a023-45576961e32a_chart paper.jpg"),
  new PostModel('e737deaa-bab8-42c0-8ee1-57fce21bffbd', 'mm2c0cb7-8000-223a-b385-8581298ea7ff', "post2", "http://localhost:3000/images/9dba5afb-0f69-41e6-b432-08123fa58ff0_arbaz.jpeg"),
  new PostModel('e737deaa-bab8-42c0-8ee1-57fce21bffbe', 'mm2c0cb7-8000-223a-b385-8581298ea7ff', "post3", "http://localhost:3000/images/9dba5afb-0f69-41e6-b432-08123fa58ff0_arbaz.jpeg"),
  new PostModel('e737deaa-bab8-42c0-8ee1-57fce21bffbf', 'mm2c0cb7-8000-223a-b385-8581298ea7ff', "post4", "http://localhost:3000/images/9dba5afb-0f69-41e6-b432-08123fa58ff0_arbaz.jpeg"),
  new PostModel('e737deaa-bab8-42c0-8ee1-57fce21bffbg', 'mm2c0cb7-8000-223a-b385-8581298ea7ff', "post5", "http://localhost:3000/images/9dba5afb-0f69-41e6-b432-08123fa58ff0_arbaz.jpeg"),
  new PostModel('e737deaa-bab8-42c0-8ee1-57fce21bffbh', 'mm2c0cb7-8000-223a-b385-8581298ea7ff', "post6", "http://localhost:3000/images/9dba5afb-0f69-41e6-b432-08123fa58ff0_arbaz.jpeg"),
  new PostModel('e737deaa-bab8-42c0-8ee1-57fce21bffbi', 'mm2c0cb7-8000-223a-b385-8581298ea7ff', "post7", "http://localhost:3000/images/9dba5afb-0f69-41e6-b432-08123fa58ff0_arbaz.jpeg"),
  new PostModel('e737deaa-bab8-42c0-8ee1-57fce21bffbj', 'mm2c0cb7-8000-223a-b385-8581298ea7ff', "post8", "http://localhost:3000/images/9dba5afb-0f69-41e6-b432-08123fa58ff0_arbaz.jpeg"),
  new PostModel('e737deaa-bab8-42c0-8ee1-57fce21bffbk', 'mm2c0cb7-8000-223a-b385-8581298ea7ff', "post9", "http://localhost:3000/images/9dba5afb-0f69-41e6-b432-08123fa58ff0_arbaz.jpeg"),
  new PostModel('e737deaa-bab8-42c0-8ee1-57fce21bffbl', 'mm2c0cb7-8000-223a-b385-8581298ea7ff', "post10", "http://localhost:3000/images/9dba5afb-0f69-41e6-b432-08123fa58ff0_arbaz.jpeg"),
  new PostModel('e737deaa-bab8-42c0-8ee1-57fce21bffbm', 'mm2c0cb7-8000-223a-b385-8581298ea7ff', "post11", "http://localhost:3000/images/9dba5afb-0f69-41e6-b432-08123fa58ff0_arbaz.jpeg"),
];