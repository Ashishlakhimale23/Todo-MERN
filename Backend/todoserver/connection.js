const mongoose = require("mongoose")
function connectiondb(url){
   return mongoose.connect(url)
}

module.exports={
    connectiondb
}