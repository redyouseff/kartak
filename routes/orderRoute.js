const express=require("express")
const router=express.Router()
const {createOrder,getAllOrder,getSpecificOrder,getLoggedUserOrder,checkoutSession}=require("../services/orderService")
const {protect}=require("../services/authService")

router.route("/").post(protect,createOrder).get(protect,getAllOrder)
router.route("/checkout-session").get(protect,checkoutSession)
router.route("/loggedUser").get(protect,getLoggedUserOrder)
router.route("/:id").get(protect,getSpecificOrder)







module.exports=router


