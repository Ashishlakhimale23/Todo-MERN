const express = require("express")
const routeruser = express.Router()
const {handlelogin,handlesignin}= require("../controller/user")


routeruser.post("/signin",handlesignin)
routeruser.post("/login",handlelogin)
module.exports ={
    routeruser
}