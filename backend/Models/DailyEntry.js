import mongoose from 'mongoose'
import validator from 'validator';


const entrySchema = new mongoose.Schema({
    userId : {
        type : Number,
        required : [true , 'Please enter user id']
    },
    attendance : [
        {
            date : {
                type : Date,
                required : true
            },
            currPlanId:{
                type:Number,
                required:true,
                enum:[501,502,503],
                default:501
            },
            menu : {
                "breakfast":{
                    type : Boolean,
                    required : true,
                    default: false
                },
                "lunch":{
                    type : Boolean,
                    required : true,
                    default: false
                },
                "dinner":{
                    type : Boolean,
                    required : true,
                    default: false
                },
            }
        }
    ],
},
{timestamps : true}
)



const DailyEntry = mongoose.models.dailyentry || mongoose.model('dailyentry' , entrySchema)

export default DailyEntry
