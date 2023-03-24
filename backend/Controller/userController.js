import User from "../Models/User.js";
import bcrypt from 'bcrypt'
import asyncHandler from 'express-async-handler'

export const getAllUser = asyncHandler(async (req , res) => {
    
    const users = await User.find({},{password:0,cpassword:0}).lean()

    // If no users 
    if (!users?.length) {
        return res.status(400).json({ message: 'No users found' })
    }

    res.json(users)
})

export const getOneUser = asyncHandler(async (req , res) => {
    const { id } = req.body

    // Confirm data
    if (!id) {
        return res.status(400).json({ message: 'User ID Required' })
    }

    const user = await User.findById({"_id":id},{password:0,cpassword:0}).lean()

    // If no users 
    if (!user) {
        return res.status(400).json({ message: 'No users found' })
    }

    res.json(user)
})


export const createNewUser = asyncHandler(async (req , res) => {

    // read data from req body
    const {name , email , mobileno,role , password , cpassword} = req.body

    // duplicate entry
    const duplicate = await User.findOne({email}).lean().exec()
    if (duplicate) {
        return res.status(409).json({ message: 'Duplicate username' })
    }

    // password and confirm password match
    const pwdIsCpwd = password!==cpassword;
    if(pwdIsCpwd)
    {
        return res.status(409).json({message : 'Confirm Password doesnt match with password'})
    }

    // hashing a password
    const salt = await bcrypt.genSalt()
    const hashedPassword = await bcrypt.hash(password , salt)

    // creating userObject
    const userObject = {name , email , mobileno , role , "password":hashedPassword , "cpassword": hashedPassword}

    // Create and store new user 
    const user = await new User(userObject).save()

    if (user) { //created 
        res.status(201).json({ message: `New user ${email} created` })
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