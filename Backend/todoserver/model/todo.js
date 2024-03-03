const mongoose = require("mongoose")
const user = require("./user")
const todoschema = new mongoose.Schema({
    todouser:[{ 
    title :{
        type :String,
        required : true 
    },
    description:{
        type:String,
        required:true

    },
    completed:{
        type:Boolean ,
        default:false
    }
    }],
   userid:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user'
    }
})

const todo = mongoose.model("todo",todoschema)

module.exports ={
    todo 
}