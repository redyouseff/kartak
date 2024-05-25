const express=require("express");
const router=express.Router();

 const { login}=require("../services/authService")

 router.route("/").post(login)
 
 
    
 
 module.exports=router;
