// importing router from express
import { Router } from "express";
import { addPlan, deletePlan, getAllPlan, getPlan, updatePlan } from "../Controller/planController.js";

// importing controller functions

// create router application for taking and providing req and res
const planRoute = Router();

// router queries
planRoute.get("/getPlan/:plan_type" ,  getPlan)
planRoute.get("/getAllPlan" ,  getAllPlan)
planRoute.post("/addPlan" , addPlan)
planRoute.patch("/updatePlan" , updatePlan)
planRoute.delete("/deletePlan" , deletePlan)

// exporting router application
export default planRoute;