// importing router from express
import { Router } from "express";
import { addPlan, deletePlan, getPlan, updatePlan } from "../Controller/planController.js";

// importing controller functions

// create router application for taking and providing req and res
const planRoute = Router();

// router queries
planRoute.get("/getPlan" ,  getPlan)
planRoute.post("/addPlan" , addPlan)
planRoute.patch("/updatePlan" , updatePlan)
planRoute.delete("/deletePlan" , deletePlan)

// exporting router application
export default planRoute;