import { Router } from "express";
import {
  createVehicle,
  getAssignedVehicle,
  getVehicles,
} from "../controllers/vehicle.controller.js";

const router = Router();

router.route("/get-vehicle").post(getVehicles);
router.route("/vehicle").post(createVehicle);
router.route("/assigned-vehicles").post(getAssignedVehicle); 

export default router;
