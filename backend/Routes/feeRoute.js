// importing router from express
import { Router } from "express";
import { addPlan, deletePlan, getPlan, updatePlan } from "../Controller/planController.js";

// importing controller functions

// create router application for taking and providing req and res
const planRoute = Router();

// router queries
planRoute.get("/getFee" ,  getPlan)
planRoute.post("/addFee" , addPlan)
planRoute.patch("/updateFee" , updatePlan)
planRoute.delete("/deleteFee" , deletePlan)

// exporting router application
export default planRoute;