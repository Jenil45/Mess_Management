// importing router from express
import { Router } from "express";
import { addUserPlan, getCurrentPlan, getUserCurrentPlan } from "../Controller/userPlanController.js";

// importing controller functions

// create router application for taking and providing req and res
const userplanRoute = Router();

// router queries
userplanRoute.get("/getUserPlan" ,  getCurrentPlan)
userplanRoute.get("/getusercurrentplan/:userId" ,  getUserCurrentPlan)
userplanRoute.post("/addUserPlan" , addUserPlan)
// userplanRoute.patch("/updateUserPlan" , updatePlan)
// userplanRoute.delete("/deleteUserPlan" , deletePlan)

// exporting router application
export default userplanRoute;