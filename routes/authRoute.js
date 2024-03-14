const express=require("express");
const router=express.Router();

 const { login}=require("../services/authService")

 router.route("/").get(login)
    
 
 module.exports=router;
