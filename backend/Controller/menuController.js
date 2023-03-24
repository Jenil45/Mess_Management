import Menu from "../Models/Menu.js";
import bcrypt from 'bcrypt'
import asyncHandler from 'express-async-handler'


export const getMenu = asyncHandler(async (req , res) => {
    const { menu_day } = req.body
    console.log(req.body);

    // Confirm data
    if (!menu_day) {
        return res.status(400).json({ message: 'Menu Day Require' })
    }

    const menu = await Menu.find({menu_day}).lean()

    // If no users 
    if (!menu) {
        return res.status(400).json({ message: 'No menu found' })
    }

    res.json(menu)
})


export const addMenu = asyncHandler(async (req , res) => {

    // read data from req body
    const {menu_day , menu_breakfast , menu_lunch , menu_dinner , special_menu} = req.body

    // duplicate entry
    const duplicate = await Menu.findOne({menu_day}).lean().exec()
    if (duplicate) {
        return res.status(409).json({ message: `Menu already exist for ${menu_day}` })
    }

    // creating userObject
    const menuObject = {menu_day , menu_breakfast , menu_lunch , menu_dinner , special_menu}

    // Create and store new user 
    const menu = await new Menu(menuObject).save()

    if (menu) { //created 
        res.status(201).json({ message: `Your ${menu_day} menu added` })
    } else {
        res.status(400).json({ message: 'Invalid menu data received' })
    }

})

export const updateMenu = asyncHandler(async (req, res) => {
    const {menu_day , menu_breakfast , menu_lunch , menu_dinner , special_menu } = req.body

    // Does the plan exist to update?
    const menu = await Menu.find({menu_day}).exec()
    console.log(menu);
    if (!menu) {
        return res.status(400).json({ message: 'Menu not found' })
    }

    const updatedPlan = await Plan.updateOne({menu_day} , {menu_breakfast,menu_lunch , menu_dinner, special_menu})

    res.json({ message: `${menu_day} plan updated` })
})

export const deleteMenu = asyncHandler(async (req, res) => {
    const { menu_day } = req.body

    // Confirm data
    if (!menu_day) {
        return res.status(400).json({ message: 'Menu Day Required' })
    }

    // Does the user exist to delete?
    const menu = await Menu.find({menu_day}).exec()

    if (!menu) {
        return res.status(400).json({ message: 'Menu not found' })
    }

    const result = await Menu.deleteOne({plan_type})

    const reply = `Menu of ${menu_day} deleted`

    res.json(reply)
})