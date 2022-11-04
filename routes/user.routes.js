 const {Router} = require('express');
 const {UserModel} = require("../models/User.model")

 const bcrypt = require('bcrypt');
 const jwt = require('jsonwebtoken');

 const userRoutes = Router();
 require('dotenv').config();


 userRoutes.post("/signup",async (req,res) => {
    const {email, password, age} = req.body;
    
    const isUser = await UserModel.findOne({email})
    if(isUser) {
        return res.send({"msg" : "User already exists, try login in"})
    }
    bcrypt.hash(password , 8, async(err,hash) => {
        if(err) {
           return res.send({"msg" : "Something went wrong , please try again later"})
        }

        const new_user = new UserModel({
            email,
            password : hash,
            age
        })

        try{
            await new_user.save();
            res.send({"msg" : "Singup successfully"})
        }
        catch(err) {
            console.log(err)
            res.send({"msg" : "Something went wrong, please try again"})
        }

    });
 })

 userRoutes.post("/login", async(req,res) => {
    const {email, password} = req.body;
    const user = await UserModel.findOne({email})
    const hash_password = user.password

    bcrypt.compare( password , hash_password, (err,result) => {
        if(err) {
          return  res.send({"msg" : "Something went wrong, please try again later"});
        }
        if(result) {
            const token = jwt.sign({ userId : user._id}, process.env.secret_key)
           return  res.send({"msg" : "Login successfully", token , userId : user._id})
        } else {
           return  res.send({"msg" : "Invalid credentials"})
        }
    })
 })

 module.exports = {
    userRoutes
 }