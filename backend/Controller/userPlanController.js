import UserPlan from "../Models/UserPlan.js";
import bcrypt from 'bcrypt'
import asyncHandler from 'express-async-handler'
import moment from "moment";

export const getUserCurrentPlan = asyncHandler(async (req , res) => {
    const userId = req.params.userId
    // const userId = 2002
    // console.log(userId);
    const today_date = moment().utcOffset("+05:30").add(1,'days').startOf('day').toDate()
    // const today_date = moment().format()
    // today_date.setDate(today_date.getDate()+1)
    // console.log(today_date);
    const user = await UserPlan.find({"userId":userId , "start_date":{$lte:today_date},
    "end_date":{$gte:today_date}})
    // console.log(user);
    if (!user) {
        return res.status(400).json(user)
    }

    res.json(user[0])
})

export const getCurrentPlan = asyncHandler(async (req , res) => {

    const today_date = new Date()
    // today_date.setDate(today_date.getDate())

    const user = await UserPlan.aggregate(
        [{
            $match : {
                "start_date":{$lte:today_date},
                "end_date":{$gte:today_date},
                // "planID": 
            }
        },
        {
            $group : {
                "_id": "$userId",
                "planId":{"$first":"$planId"} ,
                "fee_status" : {$first : "$fee_status"}}
        }
    ]
        )

    
    console.log(user);
    if (!user) {
        return res.status(400).json({ message: 'No users found' })
    }

    res.json(user)
})

export const getUserTodayPlan = asyncHandler(async (req , res) => {

    const userId = req.params.userId
    const today_date = new Date()
    // today_date.setDate(today_date.getDate())

    // const user = await UserPlan.aggregate(
    //     [{
    //         $match : {
    //             "start_date":{$lte:today_date},
    //             "end_date":{$gte:today_date},
    //             "userId": userId 
    //         }
    //     },
    //     {
    //         $group : {
    //             "_id": "$userId",
    //             "planId":{"$first":"$planId"} ,
    //             "fee_status" : {$first : "$fee_status"}}
    //     }
    // ]
    //     )

    const user = await UserPlan.find({"userId":userId , "start_date":{$lte:today_date},
    "end_date":{$gte:today_date}})
    // console.log(user);
    if (!user) {
        return res.status(400).json({ message: 'No users found' })
    }

    res.json(user)
})


export const addUserPlan = asyncHandler(async (req , res) => {

    // read data from req body
    const {userId , planId , fees} = req.body

    // creating userObject
    const userPlanObject = {userId , planId , fees}

    // Create and store new user 
    const userplan = await new UserPlan(userPlanObject).save()

    if (userplan) { //created 
        res.status(201).json({ message: `New user plan for user ${userId} created of plan ${planId  }` })
    } else {
        res.status(400).json({ message: 'Invalid user data received' })
    }

})

export const updateUser = asyncHandler(async (req, res) => {
    const {id , name , email , mobileno,role , password } = req.body
    // Does the user exist to update?
    const user = await User.findById({"_id":id}).exec()

    if (!user) {
        return res.status(400).json({ message: 'User not found' })
    }

    // Check for duplicate 
    const duplicate = await User.findOne({"_id": id }).lean().exec()

    // Allow updates to the original user 
    if (duplicate && duplicate?._id.toString() !== id) {
        return res.status(409).json({ message: 'Duplicate username' })
    }

    user.name = name
    user.email = email
    user.mobilemobileno =mobileno
    user.role = role

    if (password) {
        // Hash password 
        const salt = await bcrypt.genSalt()
        const hashedPassword = await bcrypt.hash(password , salt)
        user.password = hashedPassword 
        user.cpassword = hashedPassword 
    }

    const updatedUser = await user.save()

    res.json({ message: `${updatedUser.email} updated` })
})

export const deleteUser = asyncHandler(async (req, res) => {
    const { email } = req.body

    // Confirm data
    if (!email) {
        return res.status(400).json({ message: 'User ID Required' })
    }

    // Does the user exist to delete?
    const user = await User.findOne({email}).exec()

    if (!user) {
        return res.status(400).json({ message: 'User not found' })
    }

    const result = await User.deleteOne({email})

    const reply = `Username ${result.email} deleted`

    res.json({message: reply})
})