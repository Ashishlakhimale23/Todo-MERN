
const user = require("../model/user")
const bcrpty = require("bcryptjs")
const jwt = require("jsonwebtoken")


async function handlesignin(req,res){
    const {email,password,username} = req.body ;
    const userid = await user.findOne({email:email,password:password})
    console.log(email)
    console.log(userid)

    await bcrpty.hash(password,10).then((respones)=>{
        
        if(userid){
            return res.json({"status":"user already exists"})
    
        }
        else{
            
            user.create({
                username,
                email,
                password:respones
            })
            res.json({"created":username})
        }
    }).catch(error=>console.error(error))
   
    

   
}

async function handlelogin (req,res){
   const { email, password } = req.body;


const userDoc = await user.findOne({ email: email });

if (!userDoc) {
    return res.status(404).json({ success: false, message: 'User not found' });
}

bcrpty.compare(password, userDoc.password, (err, isMatch) => {
    if (err) {
        return res.status(500).json({ success: false, message: 'Internal server error' });
    }
    if (isMatch) {
       
        const token = jwt.sign({ email: email }, "ashish", { expiresIn: '1h' });
        return res.json({ success: true, token: token });
    } else {
       
        return res.status(401).json({ success: false, message: 'Passwords do not match' });
    }
});


   
   
  

}

module.exports ={
    handlelogin,handlesignin
}