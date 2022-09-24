var express = require('express');
var router = express.Router();
const {mongodb,dbName,dbUrl,MongoClient} = require('../dbConfig');
const {LoanRequest,mongoose} = require('../dbSchema')

mongoose.connect(dbUrl)

router.get('/',async(req,res)=>{
    try {
        let users = await LoanRequest.find()
        res.send({
            statusCode:200,
            data:users
        })
    } catch (error) {
        console.log(error)
        res.send({statusCode:500,message:"Internal Server Error",error})
    }
})

router.post('/',async (req,res)=>{
    try {
        let user = await LoanRequest.create(req.body)
        res.send({
            statusCode:200,
            message:"Data Saved Successfully!"
        })
    } catch (error) {
        console.log(error)
        res.send({statusCode:500,message:"Internal Server Error",error})
    }
})

router.put('/:id',async (req,res)=>{
    try {
        let user = await LoanRequest.find({_id:mongodb.ObjectId(req.params.id)})
        console.log(user)
        user[0].name = req.body.name
        user[0].email = req.body.email
        user[0].mobile = req.body.mobile
        user[0].amount = req.body.amount
        user[0].purpose = req.body.purpose

        await user[0].save()

        res.send({
            statusCode:200,
            message:"Data Saved Successfully!"
        })
    } catch (error) {
        console.log(error)
        res.send({statusCode:500,message:"Internal Server Error",error})
    }
})

router.delete('/:id',async (req,res)=>{
    try {
        let user = await LoanRequest.deleteOne({_id:mongodb.ObjectId(req.params.id)})
        res.send({
            statusCode:200,
            message:"Data Deleted Successfully!"
        })
    } catch (error) {
        console.log(error)
        res.send({statusCode:500,message:"Internal Server Error",error})
    }
})
module.exports = router;
