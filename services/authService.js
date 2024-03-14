const asyncHandler=require("express-async-handler")
const jwt=require("jsonwebtoken")
const userModel=require("../model/userModel")
const bcrypt=require("bcrypt")
const appError = require("../utils/dummy/apiError")
const { use } = require("../routes/userRoute")



const createToken=(payloud)=>{
    const token=jwt.sign({userId:payloud},process.env.JWT_SECRET_KEY,{
        expiresIn:process.env.JWT_EXPIRE_TIME
    })
    return token;
}
const login=asyncHandler(async(req,res,next)=>{
    const user =await userModel.findOne({email:req.body.email})
    if(!user || !(await bcrypt.compare(req.body.password,user.password) )){
        return next(new appError("email or password are not corrected",500))
    }
   
    token=createToken(user._id)
    res.status(200).json({status:"success",token:token})

})
const protect=asyncHandler(async(req,res,next)=>{
let token;

if(req.headers.authorization&&req.headers.authorization.startsWith("Bearer")){
  token=req.headers.authorization.split(" ")[1]
  
}
if(!token){
    return next(new appError("you are not logged in",500))
}
const decoded=jwt.verify(token,process.env.JWT_SECRET_KEY)
const user=await userModel.findById(decoded.userId)
const currentUser=user

if(!user){
     return next(new appError("user is no longer exist "))

}

req.currentUser=currentUser;

next();

})

module.exports={
    login,
    protect
}