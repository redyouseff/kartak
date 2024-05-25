const appError = require("../utils/dummy/apiError");
const placeModel=require("../model/placeModel")
const orderModel =require("../model/orderModel")
const asyncHandler = require("express-async-handler");
const { model } = require("mongoose");
const { configDotenv } = require("dotenv");
const { nextTick } = require("process");


const createOrder=asyncHandler(async(req,res,next)=>{

    const place =await placeModel.findOne({code:req.body.code})
    
    const {code,totalPrice,owner}=req.body
    if(place && owner==place.owner){
        const  totalPriceAfterDiscount =200-((totalPrice * place.discount) / 100)
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



module.exports={
     createOrder,
     getAllOrder,
     getSpecificOrder,
     getLoggedUserOrder
}