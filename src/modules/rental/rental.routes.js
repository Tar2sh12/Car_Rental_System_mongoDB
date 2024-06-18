import { Router } from "express";
import * as rentals from "./rental.controller.js";
const router = Router();
router.post("/createRental", rentals.createRental);
router.put("/updateRental/:id", rentals.updateRental);
router.delete("/deleteRental/:id", rentals.deleteRental);
router.get("/specificRental/:id", rentals.specificRental);
router.get("/getAll", rentals.getAll);
export default router;
