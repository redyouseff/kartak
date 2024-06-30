const placeModel = require("../model/placeModel");
const userModel=require("../model/userModel")
const reviewModel=require("../model/reviewMode")
const appError = require("../utils/dummy/apiError");
const asyncHandler = require("express-async-handler");
const { models } = require("mongoose");
const { title } = require("process");
const { reverse } = require("dns");

const createReview=asyncHandler(async(req,res,next)=>{
    
  
    const review=await reviewModel.create({
        title:req.body.title,
        rate:req.body.rate,
        user:req.currentUser._id,
        place:req.body.place
    })
    console.log(review)
    review.save();
    res.status(200).json({status:"success",data:review})
})

const getSpecificReview=asyncHandler(async(req,res,next)=>{
    const review=await reviewModel.findById(req.params.id)
    if(!review){
        return next(new appError(`there is no review on this id ${req.params.id}`,400))
    }
    res.status(200).json({status:"success",data:review})
})

const getAllReview=asyncHandler(async(req,res,next)=>{
    const review=await reviewModel.find({});
    res.status(200).json({status:"success",data:review})

})

const deleteReview=asyncHandler(async(req,res,next)=>{
    const review=await reviewModel.findByIdAndDelete(req.params.id)
    if(!review){
        return next (new appError(`there is no is ${req.params.id}`,400))
    }
    res.status(200).json({status:"success delete",data:review})
})

const getPlaceReview=asyncHandler(async(req,res,next)=>{
    const review = await reviewModel.find({place:req.params.id})
    if(!review){
        next (new appError(`there is on review for this id ${req.body.params}`))
    }
    res.status(200).json({status:"success",length:review.length,data:review })
})


module.exports={createReview,getSpecificReview,getAllReview,deleteReview,getPlaceReview}
