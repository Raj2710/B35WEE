const express = require('express')
const app = express()
const PORT = process.env.PORT || 8000
app.use(express.json())

let data = [
    {
        name:"Nagarajan",
        email:"nag@gmail.com",
        mobile:"9123456789",
        amount:1000000,
        purpose:"Car Loan"
    },
    {
        name:"Basha",
        email:"basha@gmail.com",
        mobile:"9123450876",
        amount:2000000,
        purpose:"Housing Loan"

    },
    {
        name:"Manikam",
        email:"manik@gmail.com",
        mobile:"9876456789",
        amount:500000,
        purpose:"Personal Loan"
    }
]

app.get('/request',(req,res)=>{
    res.send({
        statusCode:200,
        data:data
    })
})

app.get('/request/:id',(req,res)=>{
    if(req.params.id<data.length)
    {
        res.send({
            statusCode:200,
            data:data[req.params.id]
        })
    }
    else
    {
        res.send({
            statusCode:400,
            message:"Invalid ID"
        })
    }
})

app.post('/request',(req,res)=>{
    data.push(req.body)
    res.send({
        statusCode:200,
        message:"Data Saved Successfully",
    })
})

app.put('/request/:id',(req,res)=>{
    if(req.params.id<data.length)
    {
        data.splice(req.params.id,1,req.body)
        res.send({
            statusCode:200,
            message:"Data Edited Successfully"
        })
    }
    else
    {
        res.send({
            statusCode:400,
            message:"Invalid ID"
        })
    }
})

app.delete('/request/:id',(req,res)=>{
    if(req.params.id<data.length)
    {
        data.splice(req.params.id,1)
        res.send({
            statusCode:200,
            message:"Data Deleted Successfully"
        })
    }
    else
    {
        res.send({
            statusCode:400,
            message:"Invalid ID"
        })
    }
})

app.listen(PORT,()=>console.log("Server is listening "+PORT))