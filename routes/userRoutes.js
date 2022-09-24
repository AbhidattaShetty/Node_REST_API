const express = require("express")
const router = express.Router()
const User = require("../models/userSchema")
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')


router.post('/register',async (req, res, next) => {
    console.log(req.body);
    const { username,email, password} = req.body

    const Email = await User.findOne({ email })
   //if already exist show error status
   if (Email) {
       res.status(409).json({
           error: false,
           message: 'You are already registered',
           data: null
       })
   } else{
     //hashing and salting password
     const saltRounds = 10
     const salt = await bcrypt.genSalt(saltRounds)
     const passHash = await bcrypt.hash(password, salt)
     // console.log(passHash);

     //inserting data using try catch to database
     try {
         const user = await new User({
             username,
             email,
             password: passHash
         })
         //to save the data in database
         user.save();
         //sending success msg as a response
         res.status(201).json({
             error: false,
             message: 'successfully registered',
             data: user
         })
     } catch (err) {
         next(err)
     }
   }
})

//login
router.post("/login",async(req,res,next)=>{
  const {email, password} = req.body
  try{
    userValid = await User.findOne({email})
    if(userValid){
      const cmp = await bcrypt.compare(password, userValid.password)
      if(cmp){
        const payload = {email,password}
        const token = jwt.sign(payload,process.env.SECRETE_KEY )
        console.log("Token is" + token)

        res.status(200).json({
          error : false,
          message : "successfully login",
          data : {
            token,
            userValid
          }
        })
      }else {
        res.status(403).json({
          error:true,
          message : "Password do not match",
          data:null
        })
      }
    }else{
      res.status(401).json({
        error:true,
        message:"Credentials does not match",
        data:null
      })
    }
  }catch(err){
    next(err)
  }
})





module.exports = router
