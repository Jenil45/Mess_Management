import DailyEntry from "../Models/DailyEntry.js";
import bcrypt from 'bcrypt'
import asyncHandler from 'express-async-handler'

// export const getAllUser = asyncHandler(async (req , res) => {
    
//     const users = await User.find({},{password:0,cpassword:0}).lean()

//     // If no users 
//     if (!users?.length) {
//         return res.status(400).json({ message: 'No users found' })
//     }

//     res.json(users)
// })

// export const getOneUser = asyncHandler(async (req , res) => {
//     const { email } = req.body
//     console.log(req.body);

//     // Confirm data
//     if (!email) {
//         return res.status(400).json({ message: 'User ID Required' })
//     }

//     const user = await User.findById({"email":email},{password:0,cpassword:0}).lean()

//     // If no users 
//     if (!user) {
//         return res.status(400).json({ message: 'No users found' })
//     }

//     res.json(user)
// })


// export const createNewUser = asyncHandler(async (req , res) => {

//     // read data from req body
//     const {name , email , mobileno,role , password , cpassword} = req.body

//     // duplicate entry
//     const duplicate = await User.findOne({email}).lean().exec()
//     if (duplicate) {
//         return res.status(409).json({ message: 'Duplicate username' })
//     }

//     // password and confirm password match
//     const pwdIsCpwd = password!==cpassword;
//     if(pwdIsCpwd)
//     {
//         return res.status(409).json({message : 'Confirm Password doesnt match with password'})
//     }

//     // hashing a password
//     const salt = await bcrypt.genSalt()
//     const hashedPassword = await bcrypt.hash(password , salt)

//     // creating userObject
//     const userObject = {name , email , mobileno , role , "password":hashedPassword , "cpassword": hashedPassword}

//     // Create and store new user 
//     const user = await new User(userObject).save()

//     if (user) { //created 
//         res.status(201).json({ message: `New user ${email} created` })
//     } else {
//         res.status(400).json({ message: 'Invalid user data received' })
//     }

// })

export const updateDailyEntry = asyncHandler(async (req, res) => {
    const {userId , verifyThing } = req.body
    // Does the user exist to update?
    const user = await DailyEntry.findOne({"userId":userId}).exec()

    if (!user) {
            return res.status(400).json({ message: 'User not found'});
    }
    console.log(user);
    const date = new Date()

    const isTodayAdded = user.attendance.filter(item => {
        console.log(item.date);
        if( item.date.getDate()===date.getDate() && item.date.getMonth()===date.getMonth() && item.date.getYear()===date.getYear())
        {
            return item
        }
    });
    const length = isTodayAdded.length
    var updatedObject={}
    console.log(isTodayAdded[0]);
    if(verifyThing==="breakfast")
    {
        updatedObject = {"breakfast":true , "lunch":length==0?false:isTodayAdded[0].menu.lunch , "dinner":length==0?false:isTodayAdded[0].menu.dinner }
    }
    else if(verifyThing==="lunch")
    {
        updatedObject = {"breakfast": length==0?false:isTodayAdded[0].menu.breakfast, "lunch":true , "dinner":length==0?false:isTodayAdded[0].menu.dinner }
        
    }
    else if(verifyThing==="dinner"){
        updatedObject = {"breakfast": length==0?false:isTodayAdded[0].menu.breakfast, "lunch":length==0?false:isTodayAdded[0].menu.lunch , "dinner":true }
    }
    else
    {
        // const updatedObject = {"breakfast": isTodayAdded[0].menu.breakfast, "lunch":isTodayAdded[0].menu.lunch , "dinner":true }
        res.json("No verify thing is access")
    }
    // console.log(updatedObject);
    if(isTodayAdded.length === 1)
    {
        const updateEntry = await DailyEntry.updateOne({"userId":userId } , {
            $set:{
                "attendance.$[elemX].menu" : updatedObject
            }},
            {
                "arrayFilters" : [{"elemX.date":isTodayAdded[0].date}]
            }
        )
    }

    else
    {
        console.log("Print this"); 
        const today_date = new Date();
        console.log(today_date);
        const dailyEntryObject = {"date":today_date , "menu":updatedObject}

        const updateEntry = await DailyEntry.updateOne({"userId":userId } , {
            $push:{
                "attendance":dailyEntryObject
            }},
        )
    }
})

export const deleteUser = asyncHandler(async (req, res) => {
    const { id } = req.body

    // Confirm data
    if (!id) {
        return res.status(400).json({ message: 'User ID Required' })
    }

    // Does the user exist to delete?
    const user = await User.findById(id).exec()

    if (!user) {
        return res.status(400).json({ message: 'User not found' })
    }

    const result = await user.deleteOne()

    const reply = `Username ${result.email} with ID ${result._id} deleted`

    res.json(reply)
})