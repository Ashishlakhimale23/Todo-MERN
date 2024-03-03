
const jwt = require ("jsonwebtoken")
async function handleauth(req,res,next){
    
const auth = req.headers.authorization || req.headers.Authorization;

if (!auth?.startsWith("Bearer ")) return res.json({ "status": "header not found" });

const Token = auth.split(' ')[1];
console.log(Token);
try {
    const decoded = jwt.verify(Token,"ashish");
    console.log(decoded);
    req.authenticated;
    
    next();
} catch (error) {
    console.error("Token verification failed:", error);
    return res.status(401).json({ "status": "Unauthorized" });
}
           

}

module.exports ={
    handleauth

}