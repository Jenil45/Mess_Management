// importing router from express
import { Router } from "express";
import { getDayMemebr, getPlanCount } from "../Controller/statisticalController.js";

// importing controller functions

// create router application for taking and providing req and res
const statisticsRoute = Router();

// router queries
statisticsRoute.get("/getPlanCount" ,  getPlanCount)
statisticsRoute.get("/getDayMember" ,  getDayMemebr)
// statisticsRoute.get("/getusercurrentplan/:userId" ,  getUserCurrentPlan)
// statisticsRoute.get("/getusertodayplan/:userId" ,  getUserTodayPlan)
// statisticsRoute.post("/addUserPlan" , addUserPlan)
// statisticsRoute.patch("/updateUserPlan" , updatePlan)
// statisticsRoute.delete("/deleteUserPlan" , deletePlan)

// exporting router application
export default statisticsRoute;