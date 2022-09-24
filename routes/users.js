const { request } = require('express');
var express = require('express');
var router = express.Router();
const {mongodb,dbName,dbUrl,MongoClient} = require('../dbConfig');
const client = new MongoClient(dbUrl);

/* GET users listing. */
router.get('/request', async(req, res)=>{
  await client.connect();
  try {
    const db = await client.db(dbName)
    let requests = await db.collection('leads').find().toArray();
    res.send({
      statusCode:200,
      data:requests
    })
  } catch (error) {
      console.log(error)
      res.send({
        statusCode:500,
        message:"Internal Server Error",
        error
      })
  }
  finally{
    client.close()
  }
});

router.get('/request/:id', async(req, res)=>{
  await client.connect();
  try {
    const db = await client.db(dbName)
    let requests = await db.collection('leads').findOne({_id:mongodb.ObjectId(req.params.id)});
    res.send({
      statusCode:200,
      data:requests
    })
  } catch (error) {
      console.log(error)
      res.send({
        statusCode:500,
        message:"Internal Server Error",
        error
      })
  }
  finally{
    client.close()
  }
});

router.post('/request', async(req, res)=>{
  await client.connect();
  try {
    const db = await client.db(dbName)
    let requests = await db.collection('leads').insertOne(req.body)
    res.send({
      statusCode:200,
      message:"Data Saved Successfully"
    })
  } catch (error) {
      console.log(error)
      res.send({
        statusCode:500,
        message:"Internal Server Error",
        error
      })
  }
  finally{
    client.close()
  }
});

router.put('/request/:id', async(req, res)=>{
  await client.connect();
  try {
    const db = await client.db(dbName)
    let requests = await db.collection('leads').updateOne({_id:mongodb.ObjectId(req.params.id)},{
      $set:{
        name:req.body.name,
        email:req.body.email,
        mobile:req.body.mobile,
        amount:req.body.amount,
        purpose:req.body.purpose
      }
    });
    res.send({
      statusCode:requests.matchedCount==1?200:400,
      message:requests.matchedCount==1?"Data Updated Successfully":"Invalid ID",
      data:requests
    })
  } catch (error) {
      console.log(error)
      res.send({
        statusCode:500,
        message:"Internal Server Error",
        error
      })
  }
  finally{
    client.close()
  }
});

router.delete('/request/:id', async(req, res)=>{
  await client.connect();
  try {
    const db = await client.db(dbName)
    let requests = await db.collection('leads').deleteOne({_id:mongodb.ObjectId(req.params.id)});
    res.send({
      statusCode:200,
      message:"Data Deleted Successfully",
      data:requests
    })
  } catch (error) {
      console.log(error)
      res.send({
        statusCode:500,
        message:"Internal Server Error",
        error
      })
  }
  finally{
    client.close()
  }
});

module.exports = router;