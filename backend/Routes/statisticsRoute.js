// importing router from express
import { Router } from "express";
import { getDayMemebr, getMonthlyExpenses, getPlanCount, getWeekProfit } from "../Controller/statisticalController.js";

// importing controller functions

// create router application for taking and providing req and res
const statisticsRoute = Router();

// router queries
statisticsRoute.get("/getPlanCount" ,  getPlanCount)
statisticsRoute.get("/getDayMember" ,  getDayMemebr)
statisticsRoute.get("/getWeekProfit" ,  getWeekProfit)
statisticsRoute.get("/getMonthlyExpenses" ,  getMonthlyExpenses)

// exporting router application
export default statisticsRoute;