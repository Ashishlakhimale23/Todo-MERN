const mongoose = require("mongoose")

const userschema =new mongoose.Schema({
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    username:{
        type:String,
        required:true
    },
       
})

const user = mongoose.model("user",userschema);
module.exports  =user
