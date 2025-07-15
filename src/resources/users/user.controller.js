import UserModel from "./user.model.js";
import validator from 'validator';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

export default class UserController {
  getUsers(req, res){
    try {
      const all_users = UserModel.getAllUsers();

      if(!all_users){
        return res.status(404).json({
          success : false,
          message : "No users found"
        });
      }

      return res.status(200).json({
        success:true,
        data:all_users
      })

    } catch (error) {
      console.log(error);
      return res.status(500).json({
        success:false,
        message:'Internal Server Error'
      });
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
        return res.status(404).json({
          success:false,
          message:errorMsg
        })
      }

      let user_obj = {
        name : name.trim(),
        email : email.trim(),
        password: password
      };

      let user_created = UserModel.userSignUp(user_obj);

      if(!user_created){
        return res.status(400).json({
          success:false,
          message: 'Falied to add user, please try later'
        });
      }

      user_obj.password = "******************";
      return res.status(200).json({
        success:true,
        message:"User added sucessfully",
        user:user_obj
      });

    } catch (error) {
      console.log(error);
      return res.status(500).json({
        success:false,
        message:'Internal Server Error'
      });
    }
  }

  userSignIn(req, res){
    let {email, password} = req.body;
    const user_login = UserModel.userLogin({email:email, password:password});
    if(!user_login){
      return res.status(404).json({
        success:false,
        message:"Login failed, please try again. Check email and password before retrying"
      });
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
  }

}