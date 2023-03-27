import mongoose from 'mongoose'
// import validator from 'validator';


const menuSchema = new mongoose.Schema({

    menuId: {
        type: Number,
        default: 100,
      },
    menu_day:{
        type: String,
        enum: ['Sunday' , 'Monday' ,'Tuesday','Wednesday','Thursday','Friday','Saturday'],
        required : true 
    },
    menu_breakfast : {
        type : Array,
        required : [true , 'Please enter breakfast menu']
    },
    menu_lunch : {
        type : Array,
        required : [true , 'Please enter lunch menu']
    },
    menu_dinner : {
        type : Array,
        required : [true , 'Please enter dinner menu']
    },
    special_menu : {
        type : Array,
    },

},
{timestamps : true}
)

menuSchema.pre("save", async function (next) {
    var docs = this;
    // console.log(docs);
    const data = await Menu.find()
    // console.log(data.length);
    docs.menuId = docs.menuId+data.length;
    // console.log(docs.planId);
    next
  });

const Menu = mongoose.models.menu || mongoose.model('menu' , menuSchema)

export default Menu
