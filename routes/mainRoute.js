
const placeRoute=require("./placeRoute")
const userRoute=require("./userRoute")
const authRoute=require("./authRoute")
const orderRoute=require("./orderRoute")

const mainRoute=(app)=>{
    app.use("/api/place",placeRoute)
    app.use("/api/user",userRoute)
    app.use("/api/auth",authRoute)
    app.use("/api/order",orderRoute)

    

}
module.exports=mainRoute