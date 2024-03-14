
const placeRoute=require("./placeRoute")
const userRoute=require("./userRoute")
const authRoute=require("./authRoute")

const mainRoute=(app)=>{
    app.use("/api/place",placeRoute)
    app.use("/api/user",userRoute)
    app.use("/api/auth",authRoute)

    

}
module.exports=mainRoute