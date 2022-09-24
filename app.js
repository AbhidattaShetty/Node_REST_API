require("dotenv").config()
const express = require("express")
const app = express()
const userRoute = require('./routes/userRoutes')
const bodyParser = require("body-parser")
app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json());
const port = process.env.PORT || 3000



// connecting DB
require('./db/conn')

// router middleware
app.use("/",userRoute)

app.listen(port, ()=>{
  console.log(`Server is running on ${port}`)
})
