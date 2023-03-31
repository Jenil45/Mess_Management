import mongoose from 'mongoose'
import validator from 'validator';
import DailyEntry from './DailyEntry.js';


const userSchema = new mongoose.Schema({
    userId: {
        type: Number,
        default: 2000,
      },
    name : {
        type : String,
        required : [true , 'Please enter your name']
    },
    email : {
        type : String,
        required : [true , 'Please enter an email'],
        unique : [true , 'Email already exist'],
        validate(value){
            if(!validator.isEmail(value))
            {
                throw new Error("Email is invalid");
            }
        }
    },
    mobileno: {
        type: Number,
        required : [true , "Please enter an contact number"],
        validate: {
            validator: function(v) {
                return /^[0-9]{10}/.test(v);
            },
            message: '{VALUE} is not a valid 10 digit number!'
        }
    },
    role: {
        type: Number,
        enum: [0 , 1 , 2 ],
        required : true 
    },
    password : { 
        type : String,
        required : [true , "Please enter an password"],
    },
    cpassword : { 
        type : String,
        required : [true , "Please enter an confirm password"],
    }
},
{timestamps : true}
)

userSchema.pre("save", async function (next) {

    console.log("Go to pre section");
    var docs = this;
    // console.log(docs);
    const data = await User.find()
    // console.log(data.length);
    docs.userId = docs.userId+data.length;
    
    console.log("Adding : " , docs.userId);
    // const dailyEntryObject = {"userid":docs.userId , "attendance" : } 
    // const today_date = new Date("");
    if(docs.role===0)
    {

        const today_date = new Date();
        today_date.setDate(today_date.getDate()-1)
        const dailyEntryObject = {"userId":docs.userId , "attendance" : [{"date":today_date}]}
        const success = await new DailyEntry(dailyEntryObject).save();
        console.log("success daily entry : " , success);
        // return res.status(400).json({ message: 'Entry added'});
        // console.log(docs.planId);
    }
    next()
  });


const User = mongoose.models.newUser || mongoose.model('newUser' , userSchema)

export default User
