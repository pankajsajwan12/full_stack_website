 const express = require('express');
 const cors = require('cros');
 const {connection} = require("./config/mongodb");
 const {userRoutes} = require("./routes/user.routes");
 const {todoRouter} = require('./routes/todo.routes');
 const {authentication} = require("./middlewares/authentication");

 require("dotenv").config();
 const app = express();

 const port = process.env.port || 8080

 app.post("/", (req,res) => {
    res.send("Welcome to our page, please login first")
 })

 app.use(cors());
 app.use(express.json())
 app.use("/user", userRoutes)
 app.use(authentication);
 app.use("/todos", todoRouter)

 app.listen(port , async(req,res) => {
    try{
        await connection
        console.log("App is connect with mongodb");
    }
    catch(err) {
        console.log("App is not connect with mongodb");
        console.log(err);
    }
    console.log(`App is listing ${port}`);
 })