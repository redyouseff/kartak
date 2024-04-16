const express=require("express");
const router=express.Router();
const { login, resetPassword } = require("../services/authService")
const { forgetPassword } = require("../services/authService")

router.route("/").post(login)
router.route("/forgetPassword").post(forgetPassword)
router.route("/resetPassword/:token").patch(resetPassword)
 
 module.exports=router;
