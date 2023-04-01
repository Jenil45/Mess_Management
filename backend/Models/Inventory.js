import moment from 'moment';
import mongoose from 'mongoose'
import validator from 'validator';


const inventorySchema = new mongoose.Schema({
    inventoryId : {
        type : Number,
        // required : [true , 'Please enter user id'],
        default:0
    },
    name : {
        type : String,
        required : [true , 'Please enter user id']
    },
    storeType : {
        type : String,
        required : [true , 'Please enter plan id'],
        // enum: ['StoreA' , 'StoreB' ,'StoreC','StoreD','StoreE'],
        enum: ['Vessels' , 'Vegetables' ,'Essentials','Liquid','Miscellaneous'],
    },
    date: {
        type: Date,
        // required : [true , "Please enter an contact number"],
    },
    qty : {
        type : Number
    },
    usedqty : {
        type : Number,
        default:0
    },
    remainqty : {
        type : Number
    },
    single_price:{
        type:Number,
        required:true
    },
    sub_total : { 
        type : Number,
    }
},
{timestamps : true}
)
inventorySchema.pre("save", async function (next) {
    var docs = this;
    const data = await Inventory.find()

        docs.inventoryId = docs.inventoryId + data.length;

        const today_date = moment().utcOffset("+05:30").startOf('day').toDate()
        docs.date = today_date
        docs.sub_total = docs.qty*docs.single_price;
        docs.remainqty = docs.qty-docs.usedqty;

    next()
  });

// inventorySchema.pre("update", async function (next) {
//     var docs = this;
//     const data = await Inventory.find({"inventoryId":docs.inventoryId})

//         docs.sub_total = docs.qty*docs.single_price;
//         docs.usedqty = docs.usedqty + data.usedqty
//         console.log(docs);
//         docs.remainqty = docs.qty-docs.usedqty;

//     next()
//   });

const Inventory = mongoose.models.inventory || mongoose.model('inventory' , inventorySchema)

export default Inventory
