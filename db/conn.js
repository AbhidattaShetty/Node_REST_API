const mongoose = require('mongoose')

mongoose.connect(process.env.DB_CONNECTION, {useNewUrlParser:true})
.then(()=>{
  console.log("connection success")
}).catch((err)=>{
  console.log(err)
})
