// importing router from express
import { Router } from "express";

// importing controller functions
import { login } from "../Controller/login.js";
import { createNewUser, deleteUser, getAllUser, getOneUser, updateUser } from "../Controller/userController.js";

// create router application for taking and providing req and res
const router = Router();

// router queries
router.get("/getusers" ,  getAllUser)
router.get("/getuser" ,  getOneUser)
router.post("/signup" , createNewUser)
router.patch("/update" , updateUser)
router.delete("/delete" , deleteUser)
// router.get("/verify" ,  d)

// exporting router application
export default router;