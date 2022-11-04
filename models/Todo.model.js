 const mongoose = require("mongoose");

 const todoSchema = mongoose.Schema({
    task : String,
    status : Boolean,
    userId : {type : String , required : true}
 })

 const TodoModel = mongoose.model("todo", todoSchema)

 module.exports = {
    TodoModel
 }