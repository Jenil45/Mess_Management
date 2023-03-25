import mongoose from 'mongoose'
import validator from 'validator';


const feeSchema = new mongoose.Schema({
    userId : {
        type : Number,
        required : [true , 'Please enter user id']
    },
    planId : {
        type : Number,
        required : [true , 'Please enter plan id'],
    },
    start_date: {
        type: Date,
        required : [true , "Please enter an contact number"],
    },
    end_date: {
        type: Date,
        required : true 
    },
    fees : { 
        type : String,
        required : [true , "Please enter an password"],
    },
    fee_status : { 
        type : Boolean,
        required : [true , "Please enter an confirm password"],
        enum:[false,true],
        default:false
    }
},
{timestamps : true}
)


const Fee = mongoose.models.fee || mongoose.model('fee' , feeSchema)

export default User
