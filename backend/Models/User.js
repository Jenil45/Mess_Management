import mongoose from 'mongoose'
import validator from 'validator';


const userSchema = new mongoose.Schema({
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
        enum: [0,1],
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


const User = mongoose.models.newUser || mongoose.model('newUser' , userSchema)

export default User
