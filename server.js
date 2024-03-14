const express=require("express")
const app = express();
const dotenv=require("dotenv")
const {env}=require("process")
const dbConnection=require("./config/dbConnection")
const mainRoute=require("./routes/mainRoute")
const globelError=require("./middleware/globleError")
const appError=require("./utils/dummy/apiError");
const { Server } = require("http");
const path = require("path");
const bodyParser = require('body-parser')
dotenv.config({path:"config.env"})
app.use(express.json())

app.use(express.static(path.join(__dirname,"uploads")))
// app.use(bodyParser.urlencoded({ extended: false }))

const server= app.listen(process.env.PORT,()=>{
    console.log(`app listen on port ${process.env.PORT}`)
  
}
)
dbConnection();
mainRoute(app)

app.use("*",(req,res,next)=>{
    next (new appError(`cant find this id ${req.originalUrl}`,400))
})


//local error handling 
app.use(globelError)

//global error handling expable "database connection "
process.on("unhandledRejection",(err)=>{
    console.log(`unhandledRejection error :${err}`)
    server.close(()=>{
        console.error("shutting down the server")
        process.exit(1);
    })

})


