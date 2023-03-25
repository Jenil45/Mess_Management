import { Router } from 'express'
const dailyentryRouter = Router()

dailyentryRouter.post("/login" , login)
dailyentryRouter.get("/refresh" , refresh)
dailyentryRouter.get("/logout" , logout)


// router.route('/logout')
    // .post(authController.logout)

export default dailyentryRouter