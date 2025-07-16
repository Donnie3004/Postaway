import UserModel from "./user.model.js";
import validator from 'validator';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import CustomError from "../../utils/customError.js";
dotenv.config();

export default class UserController {
  getUsers(req, res){
    try {
      const all_users = UserModel.getAllUsers();

      if(!all_users){
        throw new CustomError("Bad Request", 400);
      }

      return res.status(200).json({
        success:true,
        data:all_users
      })

    } catch (error) {
      throw new CustomError();
    }
  }

  userSignUp(req, res){
    try {
      let {name, email, password} = req.body;

      let errorMsg = [];

      if(!validator.isAlpha(name)){
        errorMsg.push("Name must contain only alphabets");
      }

      if(!validator.isEmail(email)){
        errorMsg.push("Invalid Email, re-enter the correct email");
      }

      if(errorMsg.length > 0){
        throw new CustomError(errorMsg, 404); 
      }

      let user_obj = {
        name : name.trim(),
        email : email.trim(),
        password: password
      };

      let user_created = UserModel.userSignUp(user_obj);

      if(!user_created){
        throw new CustomError("Falied to add user, please try later", 404); 
      }

      user_obj.password = "******************";
      return res.status(200).json({
        success:true,
        message:"User added sucessfully",
        user:user_obj
      });

    } catch (error) {
      throw new CustomError();
    }
  }

  userSignIn(req, res){
    try {
      let {email, password} = req.body;
      const user_login = UserModel.userLogin({email:email, password:password});
      if(!user_login){
        throw new CustomError("Login failed, please try again. Check email and password", 404);
      }
      // payload creation
      let payload = {  
        name:user_login.name,
        email:email
      }  
      const token = jwt.sign(payload, process.env.SECRET_KEY, {expiresIn:6000});
      return res.status(200).json({
        success:true,
        message:"Login Successfull",
        token:token
      });
    } catch (error) {
      throw new CustomError(); 
    }
    
  }

}