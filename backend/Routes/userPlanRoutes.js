// importing router from express
import { Router } from "express";
import { addUserPlan, getConsent, getCurrentPlan, getTodayStudents, getUserCurrentPlan, getUserTodayPlan, updateConsent, updateUserPlan } from "../Controller/userPlanController.js";

// importing controller functions

// create router application for taking and providing req and res
const userplanRoute = Router();

// router queries
userplanRoute.get("/getUserPlan" ,  getCurrentPlan)
userplanRoute.get("/getTodayStudent/:type" ,  getTodayStudents)
userplanRoute.get("/getConsent/:obj" ,  getConsent)
userplanRoute.get("/getusercurrentplan/:userId" ,  getUserCurrentPlan)
userplanRoute.get("/getusertodayplan/:userId" ,  getUserTodayPlan)
userplanRoute.post("/addUserPlan" , addUserPlan)
userplanRoute.patch("/updateUserPlan" , updateUserPlan)
userplanRoute.patch("/updateConsent" , updateConsent)
// userplanRoute.delete("/deleteUserPlan" , deletePlan)

// exporting router application
export default userplanRoute;