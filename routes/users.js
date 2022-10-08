var express = require('express');
var router = express.Router();
const {mongoose,usersModel} = require('../dbSchema')
const {mongodb,dbName,dbUrl} = require('../dbConfig')
const {hashPassowrd,hashCompare,createToken,jwtDecode,validate,roleAdmin} = require('../auth')
mongoose.connect(dbUrl)


router.get('/', validate,roleAdmin,async(req,res)=>{
  
  let token = req.headers.authorization.split(" ")[1]
  let data = await jwtDecode(token)
  let user = await usersModel.findOne({email:data.email})
  if (user) {
    let users = await usersModel.find({},{password:0,__v:0})
      res.send({
        statusCode:200,
        data:users
      })
  }
  else
  {
    res.send({
      statusCode:400,
      message:"Unauthorized"
    })
  }
})

router.post('/signup', async(req,res)=>{
  try {
    let user = await usersModel.find({email:req.body.email})
    if(user.length)
    {
      res.send({
        statusCode:400,
        message:"User Already Exists"
      })
    }
    else{
      let hashedPassword = await hashPassowrd(req.body.password)
      req.body.password = hashedPassword
      let newUser = await usersModel.create(req.body)
      res.send({
        statusCode:200,
        message:"Sign Up Successfull"
      })
    }
  } catch (error) {
    console.log(error)
    res.send({statusCode:200,message:"Internal Server Error",error})
  }
})

router.post('/signin',async(req,res)=>{
  try {
    let user = await usersModel.find({email:req.body.email})
    if(user.length)
    {
        let hash = await hashCompare(req.body.password,user[0].password)

        if(hash)
        {
          let token = await createToken(user[0].email,user[0].role)
          res.send({statusCode:200,message:"Sign-in successfull!!!",token})
        }
        else
          res.send({statusCode:400,message:"Invalid Credentials"})
    }
    else
      res.send({statusCode:400,message:"User does not exists"})
  } catch (error) {
    console.log(error)
    res.send({statusCode:400,message:"Internal Server Error",error})
  }
})

module.exports = router;
