const express = require("express")
const router = express.Router()
const {handlerpost,handelget,handeldelete, handelput} = require("../controller/route")

router.post("/user",handlerpost)
router.get("/user",handelget)
router.delete("/delete",handeldelete)
router.put("/completed",handelput)


module.exports ={
    router
}