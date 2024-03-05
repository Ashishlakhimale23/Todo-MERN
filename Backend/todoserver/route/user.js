const express = require("express")
const routeruser = express.Router()
const {handlelogin,handlesignin}= require("../controller/user")
const { datavalidation } = require("../middlerware/datavalidation")


routeruser.post("/signin",datavalidation,handlesignin)
routeruser.post("/login",handlelogin)
module.exports ={
    routeruser
}