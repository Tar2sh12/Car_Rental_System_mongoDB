import { Router } from "express";
import * as cars from "./car.controller.js";
const router = Router();
router.post("/addCar", cars.addCar);
router.get("/specificCar/:id", cars.specificCar);
router.get("/getAll", cars.getAll);
router.put("/updateCar/:id", cars.updateCar);
router.delete("/deletedCar/:id", cars.deleteCar);
//========================Special APIs========================
//1
router.get("/HandT", cars.hondaAndToyota);
//2
router.get("/availableWithModel", cars.availableWithModel);
//3
router.get("/rentedOrSpecificModel", cars.rentedOrSpecificModel);
//4
router.get("/rentalStatusWithModel", cars.rentalStatusWithModel);
export default router;
