import Fee from "../Models/Fees";
import bcrypt from 'bcrypt'
import asyncHandler from 'express-async-handler'


export const getFee = asyncHandler(async (req , res) => {
    const { userId } = req.body
    console.log(req.body);

    // Confirm data
    if (!userId) {
        return res.status(400).json({ message: 'fee Type Require' })
    }

    const fee = await Fee.find({userId}).lean()

    // If no users 
    if (!fee) {
        return res.status(400).json({ message: 'No fee found' })
    }

    res.json(fee)
})


export const addFee = asyncHandler(async (req , res) => {

    // read data from req body
    const {userId , planId } = req.body

    // duplicate entry
    const duplicate = await fee.findOne({userId}).lean().exec()
    if (duplicate) {
        return res.status(409).json({ message: `fee already exist for ${userId}` })
    }

    const start_date = Date.now()

    // creating userObject
    const feeObject = {fee_type , fee_desc , fee_price}

    // Create and store new user 
    const fee = await new fee(feeObject).save()

    if (fee) { //created 
        res.status(201).json({ message: `Your ${fee_type} added` })
    } else {
        res.status(400).json({ message: 'Invalid fee data received' })
    }

})

export const updateFee = asyncHandler(async (req, res) => {
    const {fee_type , fee_desc , fee_price } = req.body

    // Does the fee exist to update?
    const fee = await fee.find({fee_type}).exec()
    console.log(fee);
    if (!fee) {
        return res.status(400).json({ message: 'fee not found' })
    }

    fee.fee_type = fee_type
    fee.fee_desc = fee_desc
    fee.fee_price =fee_price

    const updatedfee = await fee.updateOne({fee_type} , {fee_type,fee_desc , fee_price})

    res.json({ message: `${fee_type} fee updated` })
})

export const deleteFee = asyncHandler(async (req, res) => {
    const { fee_type } = req.body

    // Confirm data
    if (!fee_type) {
        return res.status(400).json({ message: 'fee Type Required' })
    }

    // Does the user exist to delete?
    const fee = await fee.find({fee_type}).exec()

    if (!fee) {
        return res.status(400).json({ message: 'fee not found' })
    }

    const result = await fee.deleteMany(fee_type)

    const reply = `fee ${fee_type} deleted`

    res.json(reply)
})