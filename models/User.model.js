 const mongoose = require("mongoose");

 const userSchema = new mongoose.Schema({
    user_id : {type : Number},
    email : { type : String , required : true},
    password : {type : String, require : true},
    age : {type : Number , require : true},
 })

 const UserModel = mongoose.model("signup_data", userSchema) 

 module.exports = {
    UserModel
 }