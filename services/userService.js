const { default: slugify } = require("slugify")
const appError=require("../utils/dummy/apiError")
const asyncHandler = require('express-async-handler')
const {uploadSingleImage}=require("../middleware/uploadImage")
const { v4: uuidv4 } = require('uuid');
const { now } = require("mongoose")
const sharp= require("sharp")
const userModel=require("../model/userModel");
const { use } = require("../routes/userRoute");

const uploadImage=uploadSingleImage("profileImage")
const reasizeImage=asyncHandler(async(req,res,next)=>{
    const fileName=`user-${uuidv4()}-${Date.now()}.jpeg`
    if(req.file){
        try{
            await sharp(req.file.buffer)
            .toFormat("jpeg")
            .jpeg({quality:90})
            .toFile(`uploads/user/${fileName}`)
        }
        catch(err){
            res.json(err)

        }
        
   
    }
    req.body.profileImage=fileName
    next()



})
const createUser=asyncHandler(async(req,res,next)=>{
    req.body.slug=slugify(req.body.name)
    const user =await userModel.create(req.body);
    if(!user){
        res.status(400).json({status:"faild",message:"faild to create an user"})
    }
    res.status(200).json({status:"success",Date:user})

})
const getSpecificUser=asyncHandler(async(req,res,next)=>{
    const id=req.params.id;
    const user = await userModel.findById(id)
    if(!user){
        res.status(400).json(`not user in this id ${id}`)
    }
    res.status(200).json({status:"success",data:user})
})

const getAllUser=asyncHandler(async(req,res,next)=>{
    const user =await userModel.find()
    if(!user){
        res.status(400).json(`no user`)
    }
    res.status(200).json({length:user.length,status:"success",data:user})

})
const deleteUse=asyncHandler(async(req,res,next)=>{
    const id=req.params.id
    const user=await userModel.findByIdAndDelete(id)
    if(!user){
        res.status(500).json(`not found user in this id${user}`)
    }
    res.status(200).json({status:"success",message:"user is deleted"})
})

const updateUser=asyncHandler(async(req,res,next)=>{
    const id=req.params.id
    if(req.body.name){
        req.body.slug=slugify(req.body.name)
    }
    
    const user=await userModel.findByIdAndUpdate(id,req.body,{new:true})
    if(!user){
        res.status(500).json(`not user for this id ${id}`)

    }
    res.status(500).json({status:"success",data:user})


})

module.exports={
    uploadImage,
    reasizeImage,
    createUser,
    getSpecificUser,
    getAllUser,
    deleteUse,
    updateUser
    

}