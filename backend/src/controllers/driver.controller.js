import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { Driver } from "../models/driver.model.js";
import { Vehicle } from "../models/vehicle.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const getDriverVehicles = asyncHandler(async (req, res) => {
  const { driverId } = req.body;
  const driver = await Driver.findById(driverId);
  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        driver.vehicleAssigned,
        "Driver vehicles fetched successfully"
      )
    );
});
const getDrivers = asyncHandler(async (req, res) => {
  const drivers = await Driver.find({});

  return res
    .status(200)
    .json(new ApiResponse(200, drivers, "Driver fetched successfully"));
});
const getAssigned = asyncHandler(async (req, res) => {
  const { driverId } = req.body;
  const driver = await Driver.findById(driverId);
  console.log(driver);

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        driver.vehicleAssigned,
        "Driver fetched successfully"
      )
    );
});

const createDriver = asyncHandler(async (req, res) => {
  const { name, email, phone } = req.body;
  if (!name || !email || !phone) {
    throw new ApiError(400, "All fields are required");
  }
  const driver = await Driver.create({
    name,
    email,
    phone,
    assignVehicle: [],
  });
  return res
    .status(201)
    .json(new ApiResponse(200, driver, "Driver created successfully"));
});

const assignVehicle = asyncHandler(async (req, res) => {
  const { vehicleId, driverId, starttime, endtime } = req.body;
  if (!vehicleId || !driverId || !starttime || !endtime) {
    throw new ApiError(400, "All fields are required");
  }
  const driver = await Driver.findById(driverId);
  const vehicle = await Vehicle.findById(vehicleId);

  driver.vehicleAssigned.push({ vehicleid: vehicleId, starttime, endtime });
  vehicle.assignedDriver.push({ driverid: driverId, starttime, endtime });

  driver.save({ validateBeforeSave: false });
  vehicle.save({ validateBeforeSave: false });
});

const unassignVehicle = asyncHandler(async (req, res) => {
  const { vehicleId, driverId } = req.body;
  const driver = await Driver.findById(driverId);
  const vehicle = await Vehicle.findById(vehicleId);

  driver.vehicleAssigned = driver.vehicleAssigned.filter(
    (vehicle) => vehicle.vehicleid !== vehicleId
  );
  vehicle.assignedDriver = vehicle.assignedDriver.filter(
    (driver) => driver.driverid !== driverId
  );

  driver.save({ validateBeforeSave: false });
  vehicle.save({ validateBeforeSave: false });
});

export {
  getDrivers,
  createDriver,
  assignVehicle,
  getAssigned,
  getDriverVehicles,
  unassignVehicle
};
