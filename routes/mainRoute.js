
const placeRoute=require("./placeRoute")

const mainRoute=(app)=>{
    app.use("/api/place",placeRoute)

}
module.exports=mainRoute