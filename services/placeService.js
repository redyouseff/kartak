const { default: slugify } = require("slugify")
const placeModel =require("../model/placeModel")
const appError=require("../utils/dummy/apiError")
const asyncHandler = require('express-async-handler')
const {uploadSingleImage}=require("../middleware/uploadImage")
const { v4: uuidv4 } = require('uuid');
const { now } = require("mongoose")
const sharp= require("sharp")




const uploadImage=uploadSingleImage("imageCover")
const reasizeImage=asyncHandler(async(req,res,next)=>{
    let fileName=`place-${uuidv4()}-${Date.now()}.jpeg`
    if(req.file){
     sharp(req.file.buffer)
     .toFormat("jpeg")
     .jpeg({quality:90})
    .toFile(`uploads/place/${fileName}`)
     
    req.body.imageCover=fileName;
    }
  
    next()

})
const createPlace=asyncHandler(async(req,res,next)=>{
   
    req.body.slug=slugify(req.body.name)
  
    const place= await placeModel.create(req.body)
    place.save()
    res.status(200).json({data:place})
    

})


const getSpecificPlace=asyncHandler(async(req,res,next)=>{
    const place=await  placeModel.findById(req.params.id)
    if(!place){
        res.status(400).json(`no place for this id ${req.params.id}`)
    }
    res.status(200).json({data:place})
})


const getAllPlace=asyncHandler(async(req,res,next)=>{
    const place=await placeModel.find()
    if(!place){
        res.status(400).json(`there is no places`)
    }
    res.status(200).json({length:place.length,status:"success",data:place})
    
})

const DeletePlace= asyncHandler (async(req,res,next)=>{
    const id=req.params.id
    const place =await placeModel.findByIdAndDelete(id)
    if(!place){
        res.status(400).json(`no place for this id ${id}`)
    }
    res.status(200).json({ length:place.length,status:"success",data:place})
})
const updatePlace=asyncHandler(async(req,res,next)=>{
    const place =await placeModel.findByIdAndUpdate(req.params.id,req.body,{new:true})
    place.save();
    if(!place){
        res.status(400).json(`no place for this id ${req.params.id}`)
    }
    res.status(200).json({status:"success",data:place})

})

module.exports={
    createPlace,
    uploadImage,
    reasizeImage,
    getSpecificPlace,
    getAllPlace,
    DeletePlace,
    updatePlace
    
}
