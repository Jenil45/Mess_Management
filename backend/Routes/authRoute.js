import { Router } from 'express'
import { login, logout, refresh } from '../Controller/authController.js'
const authrouter = Router()

authrouter.post("/login" , login)
authrouter.get("/refresh" , refresh)
authrouter.get("/logout" , logout)


// router.route('/logout')
    // .post(authController.logout)

export default authrouter