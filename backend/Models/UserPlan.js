import mongoose from 'mongoose'
import validator from 'validator';


const userplanSchema = new mongoose.Schema({
    userId : {
        type : Number,
        required : [true , 'Please enter user id']
    },
    subId : {
        type : Number,
        // required : [true , 'Please enter user id']
    },
    planId : {
        type : Number,
        required : [true , 'Please enter plan id'],
    },
    start_date: {
        type: Date,
        // required : [true , "Please enter an contact number"],
    },
    end_date: {
        type: Date,
        // required : true 
    },
    reamaining_days:{
        type:Number,
        // required:true
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
userplanSchema.pre("save", async function (next) {
    var docs = this;
    // console.log(docs);
    const data = await UserPlan.find()
    // console.log(data.length);

        docs.subId = docs.subId + data.length;
        const today_date = new Date();
        console.log(today_date);
        const end_date = new Date();
        console.log(end_date);
        today_date.setDate(today_date.getDate()+1)
        console.log(today_date);
        if(docs.planId === 501)
        {
            end_date.setDate(end_date.getDate()+1)
        }
        else if(docs.planId === 502)
        {
            end_date.setDate(end_date.getDate()+7)
        }
        else if(docs.planId === 503)
        {
            end_date.setDate(end_date.getDate()+30)
        }
        docs.start_date = today_date
        docs.end_date = end_date
        docs.reamaining_days = Math.round((end_date.getTime()-today_date.getTime())/(1000*3600*24))+1;
    // console.log(docs.planId);
    next()
  });

const UserPlan = mongoose.models.userplan || mongoose.model('userplan' , userplanSchema)

export default UserPlan
