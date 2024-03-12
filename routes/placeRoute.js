const express=require("express");
const router=express.Router();
const multer  = require('multer')
const upload = multer({ dest: 'uploads/place/' })
const{createPlace,uploadImage,reasizeImage}=require("../services/placeService")

router.route("/").post(uploadImage,reasizeImage,createPlace)


module.exports=router;