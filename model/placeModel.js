const mongoose=require("mongoose");
const placeSchema=mongoose.Schema({
    name:{
        type:String,
        trim:true,
        required:[true,"name is required"],
        maxlength:[200,"too long name"],
        minlength:[3,"too short name"]
    },
    slug:{
        type:String,
        required:true,
        lowercase:true
    },
    description:{
        type:String,
        required:[true,"description is required"],
        minlength:[20,"too short description"]
    },
    discount:{
        type:Number,
        required:[true,"discount is required"]
    },
    imageCover:{
        type:String,
        required:[true,"image is required"]
    }  ,
    categore:{
        type:String,
        required:[true,"categore is required"]
    }  ,
    ratingAverage:{
        type:Number,
        min:[1,"ratingAverage must be greater than 1"],
        min:[5,"ratingAverage must be greater than 1"]
    },
    ratingQuantity:{
        type:Number,
        default:0
    }


},{timestamps:true})

const placeModel=mongoose.model("place",placeSchema)
module.exports=placeModel

