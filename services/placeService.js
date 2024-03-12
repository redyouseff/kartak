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
    let fileName=`place-${uuidv4()}.jpeg`
    
     sharp(req.file.buffer).resize(600,600)
     .toFormat("jpeg")
     .jpeg({quality:90})
    .toFile(`uploads/place${fileName}`)
     
    req.body.imageCover=fileName;
  
    next()

})
const createPlace=asyncHandler(async(req,res,next)=>{
   
    req.body.slug=slugify(req.body.name)
  
    const place= await placeModel.create(req.body)
    place.save()
    res.status(200).json({data:place})
    

})

module.exports={
    createPlace,
    uploadImage,
    reasizeImage
    
}
