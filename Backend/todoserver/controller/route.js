const { response } = require("express");
const {todo} = require("../model/todo")
const user =require ("../model/user")
const jwt = require ("jsonwebtoken");


async function handlerpost(req,res) {
    let useremail 
    
    let newtodo ={
        title:"",
        description:""
    }
    const { title, description} = req.body;
    console.log(title,description)
      const auth = req.headers.authorization || req.headers.Authorization 

    if(!auth?.startsWith("Bearer ")) return res.json({"status":"header not found"})
    const Token = auth.split(' ')[1];
    console.log(Token)
      jwt.verify(Token,"ashish",(resp,decoded)=>{
        if(resp){console.log(resp)}
        else{
            console.log(decoded)
            useremail= decoded.email;
            console.log(useremail)
        }
    })
    newtodo.title=title;
    newtodo.description=description; 
    const User = await user.findOne({email:useremail})
    console.log(User._id)
    await todo.updateOne({userid:User._id},{
        $push:{todouser:newtodo}    
    },{
        upsert:true
    },(err,resp)=>{
        if(err){
            console.log(err)
        }
        else{
           console.log(resp)
        }
    })
     todo.findOne({ userid: User._id }).exec()
  .then((response) => {
    if (!response) {
      console.log("Todo not found");
      return;
    }
    console.log(response.todouser);
    res.send(response.todouser)
  })
  .catch((err) => {
    console.log(err);
  });
   
}

async function handelget(req,res){
  let useremail
  const auth = req.headers.Authorization || req.headers.authorization
  if(!auth.startsWith('Bearer ')) return res.send("header not found")
  const token = auth.split(' ')[1]
  jwt.verify(token,"ashish",(err,decoded)=>{
    if(err){
      console.log(err)
    }
    else{
      console.log(decoded.email)
      useremail = decoded.email
    }
  })

  const User = await  user.findOne({email:useremail})
  await todo.findOne({userid:User._id}).exec()
  .then((resp)=>{
    res.send(resp.todouser)
  }).catch(error=>console.log(error))
}

async function handeldelete(req,res){
  
  
  try{
    console.log(req.body)
  const {deleteid} = req.body
  console.log(deleteid)
  const response = await todo.findOneAndUpdate(
  { "todouser._id": deleteid },
  { $pull: { "todouser": { _id: deleteid } } }
);

  if(response) {
    console.log(response)
  }
  else{
    console.log("id not fonud")
  }
  console.log("deleted successfully")
  res.send(" deleted successfully")

  }
  catch(error){
    console.log(error)
  }

}


const handelput = async (req,res) =>{
  try{
    console.log(req.body)
  const {id} = req.body;
  console.log(id)
   await todo.findOneAndUpdate({"todouser._id":id},{$set:{"todouser.$.completed":true}},
   {new:true}
  ).exec().then((resp)=>{
    console.log(resp)
    
    res.send("updated successfully")
  }).catch(error=>console.log(error))}
  
  catch(error){
    console.log(error)
  }
 
}

module.exports= {
    handlerpost,
    handelget,
    handeldelete,
    handelput
}
