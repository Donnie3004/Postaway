import { v4 as uuidv4 } from 'uuid';

export default class UserModel {
  constructor(_id, _name, _email, _password) {
    this.id = _id;
    this.name = _name;
    this.email = _email;
    this.password = _password;
  }

  static getAllUsers(){
    return users;
  }

  static userSignUp(userObj){
    const new_user = new UserModel(uuidv4(), userObj.name, userObj.email, userObj.password);
    users.push(new_user);
    return new_user;
  }

  static checkUserByEmail(_email){
    const user_found = users.find(obj => obj.email === _email);
    return user_found;
  }

  static userLogin(loginObj){
    const email_exists = this.checkUserByEmail(loginObj.email);
    if(!email_exists){
      return email_exists;
    }
    // what if there are more people with same email that why refinding 
    const credential_matching = users.find((obj)=> obj.email === loginObj.email && obj.password === loginObj.password);
    return credential_matching;
  }

}

let users = [
  new UserModel('mm2c0cb7-8000-223a-b385-8581298ea7ff', "arbaz", "arbaz@gmail.com", "12345"),
  new UserModel('mm2c0cb7-8001-223a-b385-8581298ea7ff', "donnie", "donnie@gmail.com", "12345")
];