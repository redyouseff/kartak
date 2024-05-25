const express=require("express")
const router=express.Router()
const {createOrder,getAllOrder,getSpecificOrder,getLoggedUserOrder}=require("../services/orderService")
const {protect}=require("../services/authService")

router.route("/").post(protect,createOrder).get(protect,getAllOrder)
router.route("/loggedUser").get(protect,getLoggedUserOrder)
router.route("/:id").get(protect,getSpecificOrder)





module.exports=router


