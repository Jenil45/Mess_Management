// importing router from express
import { Router } from "express";
import { addUserPlan, getCurrentPlan, getTodayStudents, getUserCurrentPlan, getUserTodayPlan, updateUserPlan } from "../Controller/userPlanController.js";

// importing controller functions

// create router application for taking and providing req and res
const userplanRoute = Router();

// router queries
userplanRoute.get("/getUserPlan" ,  getCurrentPlan)
userplanRoute.get("/getTodayStudent" ,  getTodayStudents)
userplanRoute.get("/getusercurrentplan/:userId" ,  getUserCurrentPlan)
userplanRoute.get("/getusertodayplan/:userId" ,  getUserTodayPlan)
userplanRoute.post("/addUserPlan" , addUserPlan)
userplanRoute.patch("/updateUserPlan" , updateUserPlan)
// userplanRoute.delete("/deleteUserPlan" , deletePlan)

// exporting router application
export default userplanRoute;