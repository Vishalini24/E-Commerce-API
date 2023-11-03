import  UserModel  from "./user.model.js";
import jwt from "jsonwebtoken";

export default class UserController{

    signUp(req,res){
        const{name,email,password,type} = req.body;
        const createdRecord = UserModel.signUp(name,email,password,type);
        res.status(201).send(createdRecord);
    }

    signIn(req,res){
      const result = UserModel.signIn(req.body.email,req.body.password);
      if(!result){
         return res.status(400).send('Incorrect Credentials');
      }
      else{
        //1.Create Token
        const token = jwt.sign({userID: result.id,email:result.email},"QlTNVfhoRBVDM2QyXrRyMkfIjSeZF7uZ",{
          expiresIn:'1h',
        });

        //2.Send Token
        return res.status(200).send(token);
      }
    }
}