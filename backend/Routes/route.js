// importing router from express
import { Router } from "express";

// importing controller functions
import { login } from "../Controller/login.js";

// create router application for taking and providing req and res
const router = Router();

// router queries
router.get("/login" ,  login)
// router.get("/verify" ,  d)

// exporting router application
export default router;