const {connectiondb} = require("./connection")
const express = require("express")
const  {router} = require ("./route/todo")
const  {routeruser} = require ("./route/user")
const cors = require("cors")
const { handleauth } = require("./middlerware/userauth")



const app = express();
app.use(cors())
app.use(express.urlencoded({extended:false}))
app.use(express.json())
app.use("/todo",routeruser)

app.use(handleauth)
app.use("/todo",router)


connectiondb("mongodb://127.0.0.1:27017/todoserver").then(()=>console.log("connected to database"))
app.listen(8000,()=>console.log("connected to server"))
