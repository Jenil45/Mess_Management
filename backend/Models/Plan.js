import mongoose from 'mongoose'
import autoIncrement from 'mongoose-auto-increment'
// import validator from 'validator';


const planSchema = new mongoose.Schema({

    planId: {
        type: Number,
        default: 500,
      },
    plan_type:{
        type: String,
        enum: ['Daily' , 'Weekly' ,'Monthly'],
        required : true 
    },
    plan_desc : {
        type : String,
        required : [true , 'Please enter subscription description']
    },
    plan_price: {
        type: Number,
        required : [true , "Please enter an number"],
        minimum: 0,
        maximum: 1000000,
    },
},
{timestamps : true}
)

planSchema.pre("save", async function (next) {
    var docs = this;
    // console.log(docs);
    const data = await Plan.find()
    // console.log(data.length);
    if(docs.plan_type==='Daily')
    {
        docs.planId = 501;
    }
    if(docs.plan_type==='Weekly')
    {
        docs.planId = 502;
    }
    if(docs.plan_type==='Monthly')
    {
        docs.planId = 503;
    }
    // console.log(docs.planId);
    next()
  });

// autoIncrement.initialize(mongoose.connection); // 3. initialize autoIncrement 

// planSchema.plugin(autoIncrement.plugin, 'planId')

const Plan = mongoose.models.plan || mongoose.model('plan' , planSchema)

export default Plan
