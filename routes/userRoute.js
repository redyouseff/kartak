const express=require("express")
const router=express.Router();
const {uploadImage,reasizeImage,createUser,getSpecificUser,getAllUser,deleteUse,updateUser}=require("../services/userService")

router.route("/").post(uploadImage,reasizeImage,createUser)
.get(getAllUser)
router.route("/:id").get(getSpecificUser)
.delete(deleteUse)
.put(uploadImage,reasizeImage,updateUser)
module.exports=router;


