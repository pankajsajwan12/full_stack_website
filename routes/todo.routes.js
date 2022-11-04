 const {Router} = require("express")
 const {TodoModel} = require("../models/Todo.model")

 const todoRouter = Router();

 todoRouter.get("/:userId", async(req,res) => {
    const { userId } = req.params;
    const todos = await TodoModel.find({userId});
    res.send(todos);
 })

 todoRouter.post("/:userId/addtodo", async(req,res) => {
    const {userId} = req.params;
    const {task, status} = req.body;
    
    const new_todo = new TodoModel({
        task,
        status,
        userId
    })
    await new_todo.save();
    res.send({"msg" : "todos successfully created", new_todo});
 })

 todoRouter.patch("/:userId/:todoId/update", async(req,res) => {
    const { userId , todoId} = req.params;
    console.log("todoId" ,todoId)
    const todos = await TodoModel.findOne({_id : todoId});
  
    if(todos.userId !== userId) {
        return res.send({"msg" : "You are not authorised to do it"})
    }
    const new_todos = await TodoModel.findByIdAndUpdate(todoId , req.body)
    return res.send({"msg" : "update todo", new_todos})
 })

 todoRouter.delete("/:userId/delete/:todoId", async(req,res) => {
    const { userId , todoId } = req.params;
    const todos = await TodoModel.findOne({_id  : todoId})
    console.log(todos)
    if(todos.userId !== userId) {
        return res.send({"msg" : "Your are not authorised to dot it"})
    }
    const new_todos = await TodoModel.findByIdAndDelete(todoId)
    return res.send({"msg" : "deleted successfully"});
 })

 module.exports = {
    todoRouter
 }