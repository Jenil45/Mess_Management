import { Router } from 'express'
import {updateDailyEntry } from '../Controller/dailyentryController.js'
const dailyentryRouter = Router()

dailyentryRouter.patch("/updateentry" , updateDailyEntry)
// dailyentryRouter.get("/getentry" , getUserEntry)
// dailyentryRouter.get("/deleteentry" , deleteUserEntry)


// router.route('/logout')
    // .post(authController.logout)

export default dailyentryRouter