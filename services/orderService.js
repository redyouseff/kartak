const appError = require("../utils/dummy/apiError");
const placeModel=require("../model/placeModel")
const orderModel =require("../model/orderModel")
const asyncHandler = require("express-async-handler");
const { model } = require("mongoose");
const { configDotenv } = require("dotenv");
const { nextTick } = require("process");
const stripe = require('stripe')('sk_test_51PKm4rH0IrZrduSRAqVe8SaShF2l66K82UTdapW660S9KpJiiqZygJmHgUvZhf4VMxQeTl5mIDgoZ8a1GE7wXGQj009W4TlcCz');



const createOrder=asyncHandler(async(req,res,next)=>{

    const place =await placeModel.findOne({code:req.body.code})
    
    const {code,totalPrice,owner}=req.body
    if(place && owner==place.owner){
        const  totalPriceAfterDiscount = 200-((totalPrice * place.discount) / 100)
        const order= await orderModel.create({
            user:req.currentUser._id,
            place:place._id,
            paidAt:Date.now(),
            totalPrice:totalPrice,
            totalPriceAfterDiscount:totalPriceAfterDiscount,
            owner:owner
            
        })
       
        if(!order){
            return next(new appError("the is problem on create this order",400))
        }
         res.status(200).json({status:"success",data:order})

    }
    else {
        return next (new appError("invalid owner or code ",400))
    }
   
    
    
})

const getAllOrder=asyncHandler(async(req,res,next)=>{

    const order=await orderModel.find()
    if(!order){
        return next(new appError("there is no orders ",400))
    }
    res.status(200).json({status:"success",data:order})
})
const getSpecificOrder=asyncHandler(async(req,res,next)=>{
    const order =await orderModel.findById(req.params.id)
    if(!order){
        return next(new appError("there is no orders ",400))
    }
    res.status(200).json({status:"success",data:order})

})

const getLoggedUserOrder=asyncHandler(async(req,res,next)=>{
  
    const order =await orderModel.find({user:req.currentUser._id})
    if(!order){
        return next (new appError(`there is no order for this user ${req.currentUser._id}`))
    }
    res.status(200).json({status:"success",data:order})
})

const checkoutSession=asyncHandler(async(req,res,next)=>{

    const session= await stripe.checkout.sessions.create({
        line_items:[
            {
                price_data: {
                    currency: "egp",
                    product_data: {
                        name: req.currentUser.name,
                        
                    },
                    unit_amount:req.body.totalPrice  * 100, 
                },
                quantity: 1
            }
        ],

        mode: 'payment',
        success_url: `${req.protocol}://${req.get("host")}/api/place`,
        cancel_url: `${req.protocol}://${req.get("host")}/api/order`,
    })
    res.status(200).json({status:"success",data:session})
})

const webhookChecout=asyncHandler(async(req,res,next)=>{
    console.log("in webhook ....")
    console.log(process.env.STRIPE_WEBHOOK_SECRET)

    const sig = req.headers['stripe-signature'];
    
    console.log(sig)

    let event;
  
    try {
      event = stripe.webhooks.constructEvent(req.body, sig,"whsec_2RFE52qXrGB3kOMqblULiHecrXu3zcXe");

    } catch (err) {
        console.log("error ")
     return res.status(400).send(`Webhook Error: ${err.message}`);
   
    }

    if(event.type =="checkout.session.completed"){

        console.log("create order her ..........")
    }
})


module.exports={
     createOrder,
     getAllOrder,
     getSpecificOrder,
     getLoggedUserOrder,
     checkoutSession,
     webhookChecout
}