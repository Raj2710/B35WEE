var express = require('express');
var router = express.Router();
const {mongodb,MongoClient,dbName,dbUrl} = require('../dbConfig')

const client = new MongoClient(dbUrl)
router.get('/all',async(req,res)=>{
  await client.connect()
  try {
    let db = await client.db(dbName);
    let users = await db.collection('users').find({}).project({password:0}).toArray()
    res.send({statusCode:200,users})
  } catch (error) {
    console.log(error)
    res.send({statusCode:500,message:"Internal Server Error"})
  }
  finally{client.close()}
})

router.get('/user/:id',async(req,res)=>{
  await client.connect()
  try {
    let db = await client.db(dbName);
    let user = await db.collection('users').findOne({_id:mongodb.ObjectId(req.params.id)});
    if(user)
      res.send({statusCode:200,user})
    else
      res.send({statusCode:400,message:"User Does Not Exists",user})
  } catch (error) {
    console.log(error)
    res.send({statusCode:500,message:"Internal Server Error"})
  }
  finally{client.close()}
})

router.post('/add-user',async(req,res)=>{
  await client.connect()
  try {
    let db = await client.db(dbName);
    let users = await db.collection('users').insertOne(req.body);
    res.send({statusCode:200,message:"User created successfully!"})

  } catch (error) {
    console.log(error)
    res.send({statusCode:500,message:"Internal Server Error"})
  }
  finally{
    client.close()
  }
  
})

router.put('/edit-user/:id',async(req,res)=>{

  await client.connect()
  try {
    let db = await client.db(dbName);
    let user = await db.collection('users').updateOne({_id:mongodb.ObjectId(req.params.id)},{$set:req.body});
    if(user.matchedCount!==0 && user.modifiedCount!==0)
      res.send({statusCode:200,message:"User Edited Successfully"})
    else
      res.send({statusCode:400,message:"User Does Not Exists",user})
  } catch (error) {
    console.log(error)
    res.send({statusCode:500,message:"Internal Server Error"})
  }
  finally{client.close()}
})

router.delete('/delete-user/:id',async(req,res)=>{

  await client.connect()
  try {
    let db = await client.db(dbName);
    let user = await db.collection('users').deleteOne({_id:mongodb.ObjectId(req.params.id)});
    if(user.deletedCount!=0)
      res.send({statusCode:200,message:"User Deleted Successfully"})
    else
      res.send({statusCode:400,message:"User Does Not Exists"})
  } catch (error) {
    console.log(error)
    res.send({statusCode:500,message:"Internal Server Error"})
  }
  finally{client.close()}
})

router.put('/change-password/:id',async(req,res)=>{
  await client.connect()
  try {
    let db = await client.db(dbName);
    let user = await db.collection('users').findOne({_id:mongodb.ObjectId(req.params.id)});
    if(user)
    {
      if(user.password===req.body.currentPassword)
      {
        let change = await db.collection('users').updateOne({_id:mongodb.ObjectId(req.params.id)},{$set:{password:req.body.newPassword}})
        res.send({statusCode:200,message:"Password Changed Successfully"})
      }
      else{
        res.send({statusCode:400,message:"Invalid Current Password"})
      }
    }
    else
      res.send({statusCode:400,message:"User Does Not Exists",user})
  } catch (error) {
    console.log(error)
    res.send({statusCode:500,message:"Internal Server Error"})
  }
  finally{client.close()}
})


module.exports = router;
