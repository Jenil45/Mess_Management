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
    const email  = req.params.email
    // console.log(email);
    // Confirm data
    if (!email) {
        return res.status(400).json({ message: 'User ID Required' })
    }

    const user = await User.findOne({"email":email},{password:0,cpassword:0}).lean()

    // If no users 
    if (!user) {
        return res.status(400).json({ message: 'No users found' })
    }

    res.json(user)
})
export const getUser = asyncHandler(async (req , res) => {
    const userId = req.params.userId
    if (!userId) {
        return res.status(400).json({ message: 'User ID Required' })
    }

    const user = await User.findOne({"userId":userId},{password:0,cpassword:0}).lean()

    // If no users 
    if (!user) {
        return res.status(400).json({ message: 'No users found' })
    }

    res.json(user)
})


export const createNewUser = asyncHandler(async (req , res) => {

    // read data from req body
    const {name , email , mobileno,role , password , cpassword} = req.body
    // console.log(role);

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
        return res.status(201).json({ message: `New user ${email} created` })
    } else {
        return res.status(400).json({ message: 'Invalid user data received' })
    }

})

export const updateUser = asyncHandler(async (req, res) => {
    const {name , email , mobileno,role } = req.body
    const uid  = req.params.id
    // console.log(uid);
    // Does the user exist to update?
    const user = await User.findOne({"userId":uid}).exec()
    // console.log(user);
    if (!user) {
        return res.status(400).json({ message: 'User not found' })
    }

    // Check for duplicate 
    const duplicate = await User.findOne({"email": email , "mobileno" : mobileno}).lean().exec()
    // console.log(duplicate);
    // // Allow updates to the original user 
    if (duplicate) {
        return res.status(409).json({ message: 'Duplicate email or mobileno' })
    }

    const updatedObject = {name , email , mobileno , role}
    // console.log(updatedObject);
    const updatedUser = await User.updateOne({"userId":uid} , updatedObject);

    if(updateUser)
    {
        return res.json({ message: `${email} updated` })
    }
})

export const resetPassword = asyncHandler(async (req , res) => {
    // read data from req body
    const {email , oldpassword , newpassword} = req.body
    // console.log(req.body);

    // find user and match
    const foundUser = await User.findOne({'email': email }).exec()
    // console.log(foundUser);
    if (!foundUser) {
        return res.status(401).json({ message: 'User not available' })
    }
    // console.log("here");
    const matchPasswd = await bcrypt.compare(oldpassword, foundUser.password)
    // console.log(matchPasswd);
    
    if (!matchPasswd) return res.status(401).json({ message: 'Unauthorized' })


    // hashing a password
    const salt = await bcrypt.genSalt()
    const hashedPassword = await bcrypt.hash(newpassword , salt)
    // console.log(hashedPassword);
    
    const userObject = {"password":hashedPassword , "cpassword": hashedPassword}
    const resetPasswd = await User.updateOne({email} , userObject) 
    // console.log(resetPasswd);

    res.json({message : "Password resetted"})
})


export const deleteUser = asyncHandler(async (req, res) => {
    const email  = req.params.email
    // console.log(req.body);
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