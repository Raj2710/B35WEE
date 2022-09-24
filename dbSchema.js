const mongoose = require('mongoose')
const validator = require('validator')

var loanRequestSchema = new mongoose.Schema(
    {
        name:{type:'string',required:true},
        email:{
            type:'string',
            required:true,
            lowercase:true,
            validate:(value)=>{
                return validator.isEmail(value)
            }
        },
        mobile:{type:'string',default:"000-000-0000"},
        amount:{type:Number,required:true},
        purpose:{type:'string',default:"Personal Loan"},
        createdAt:{type:Date, default:Date.now()}
    }
)

var LoanRequest = mongoose.model('leads',loanRequestSchema);
module.exports={LoanRequest,mongoose}