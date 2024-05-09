const express=require("express");
const router=express.Router();

const {protect}=require("../services/authService")
const{createPlace,uploadImage,reasizeImage,getSpecificPlace,getAllPlace,DeletePlace,updatePlace}=require("../services/placeService")
// console.log("protectFuncAt placeRoute.js",protect);

router.route("/").post(uploadImage,reasizeImage,createPlace)
.get(getAllPlace)
router.route("/:id").get(getSpecificPlace)
.put(uploadImage,reasizeImage,updatePlace)
.delete(DeletePlace)


module.exports=router;