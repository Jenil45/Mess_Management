import User from "../Models/User.js";
import bcrypt from 'bcrypt'
import asyncHandler from 'express-async-handler'
import Inventory from "../Models/Inventory.js";

export const getAllUser = asyncHandler(async (req , res) => {
    
    const users = await User.find({},{password:0,cpassword:0}).lean()

    // If no users 
    if (!users?.length) {
        return res.status(400).json({ message: 'No users found' })
    }

    res.json(users)
})

export const getStore = asyncHandler(async (req , res) => {
    const storeType  = req.params.storeType

    if (!storeType) {
        return res.status(400).json({ message: 'Store Type Required' })
    }

    const store = await Inventory.find({storeType}).lean()

    // If no users 
    if (!store) {
        return res.status(400).json({ message: 'No users found' })
    }

    res.json(store)
})

export const getInventory = asyncHandler(async (req , res) => {
    const inventoryId = req.params.inventoryId
    if (!inventoryId) {
        return res.status(400).json({ message: 'User ID Required' })
    }

    const inventory = await Inventory.findOne({inventoryId}).lean()

    // If no users 
    if (!inventory) {
        return res.status(400).json({ message: 'No users found' })
    }

    res.json(inventory)
})


export const addInventory = asyncHandler(async (req , res) => {

    const {name , storeType , qty , single_price} = req.body

    // creating userObject
    const inventoryObject = {name , storeType , qty , single_price }

    // Create and store new user 
    const inventory = await new Inventory(inventoryObject).save()

    if (inventory) { //created 
        return res.status(201).json({ message: `New inventory added in ${storeType}` })
    } else {
        return res.status(400).json({ message: 'Invalid inventory data received' })
    }

})

export const updateInventory = asyncHandler(async (req, res) => {
    var {name , storeType , qty , usedqty ,single_price , } = req.body
    const inventoryId = req.params.inventoryId;
    // console.log(inventoryId);
    // creating userObject

    const inventory = await Inventory.findOne({inventoryId})
    // console.log(inventory);
    if(!inventory)
    {
        return res.status(400).json({ message: 'No inventory found' })
    }
    const sub_total = qty* single_price
    usedqty = inventory.usedqty + usedqty
    const remainqty = qty - usedqty

    const inventoryObject = {name , storeType , qty ,usedqty, remainqty, single_price , sub_total }

    // Create and store new user 
    const inventoryUpdate = await Inventory.updateOne({inventoryId},inventoryObject)
    

    if (inventoryUpdate) { //created 
        return res.status(201).json({ message: `Inventory updated` })
    } else {
        return res.status(400).json({ message: 'Invalid inventory data received' })
    }
})


export const deleteInventory = asyncHandler(async (req, res) => {
    const inventoryId = req.params.inventoryId;
    console.log(inventoryId);
    // creating userObject

    const inventory = await Inventory.findOne({inventoryId})
    // console.log(inventory);
    if(!inventory)
    {
        return res.status(400).json({ message: 'No inventory found' })
    }

    // Create and store new user 
    const inventoryDelete = await Inventory.deleteOne({inventoryId})
    

    if (inventoryDelete) { //created 
        return res.status(201).json({ message: `Inventory deleted` })
    } else {
        return res.status(400).json({ message: 'Invalid inventory data received' })
    }
})