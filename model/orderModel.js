const { string } = require("i/lib/util")
const mongoose=require("mongoose")

const orderSchema=mongoose.Schema({
    user:{
        type:mongoose.Schema.ObjectId,
        ref:"user",
        required:["true","user is reqired"]
    },
    place:{
        type:mongoose.Schema.ObjectId,
        ref:"place",
        required:[true,"place is reqired"]
    },
    paymentTypeMethod:{
        type:String,
        enum:["cash","card"],
        default:"cash"

    },
    paidAt:Date,

    totalPrice:{
        type:Number,
        required:[true,"totalPrice is reqired "]
    },

    totalPriceAfterDiscount:{
        type:Number
    },
    owner:{
        type:String,
        required:[true,"owner is reqired"]
    }
    



},{timestamps:true})


const orderModel =mongoose.model("order",orderSchema)
module.exports=orderModel