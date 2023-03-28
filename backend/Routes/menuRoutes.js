// importing router from express
import { Router } from "express";
import { addMenu, deleteMenu, getMenu, updateMenu } from "../Controller/menuController.js";

// importing controller functions

// create router application for taking and providing req and res
const menuRoute = Router();

// router queries
menuRoute.get("/getMenu/:menu_day" ,  getMenu)
menuRoute.post("/addMenu" , addMenu)
menuRoute.patch("/updateMenu" , updateMenu)
menuRoute.delete("/deleteMenu" , deleteMenu)

// exporting router application
export default menuRoute;