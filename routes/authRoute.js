const express=require("express");
const router=express.Router();
const { login, resetPassword, updatePassword, protect } = require("../services/authService")
const { forgetPassword } = require("../services/authService")

router.route("/").post(login)
router.route("/forgetPassword").post(forgetPassword)
router.route("/resetPassword/:token").patch(resetPassword)
router.route("/updatePassword").patch(protect,updatePassword)

 module.exports=router;
