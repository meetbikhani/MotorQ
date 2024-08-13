import { Router } from "express";
import {
  getDrivers,
  createDriver,
  assignVehicle,
  getAssigned,
  getDriverVehicles,
  unassignVehicle,
} from "../controllers/driver.controller.js";

const router = Router();

router.route("/all").get(getDrivers);
router.route("/create").post(createDriver);
router.route("/assign-vehicle").post(assignVehicle);
router.route("/assigned").post(getAssigned);
router.route("/vehicles").post(getDriverVehicles);
router.route("/unassign-vehicle").post(unassignVehicle);

export default router;
