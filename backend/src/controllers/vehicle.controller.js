import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { Vehicle } from "../models/vehicle.model.js";
import { Driver } from "../models/driver.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";

function parseTime(timeStr) {
  const [hours, minutes] = timeStr.split(":").map(Number);
  const date = new Date();
  date.setHours(hours, minutes, 0);
  return date;
}

function isOverlap(start1, end1, start2, end2) {
  return start2 < start1 < end2 || start2 < end1 < end2;
}

const getVehicles = asyncHandler(async (req, res) => {
  const { driverId, starttime, endtime } = req.body;
  const st1 = parseTime(starttime);
  const et1 = parseTime(endtime);

  
  const driver = await Driver.findById(driverId);
  let dvehicles = driver.vehicleAssigned;
  dvehicles = dvehicles.filter((vehicle) => {
    const st2 = parseTime(vehicle.starttime);
    const et2 = parseTime(vehicle.endtime);
    return isOverlap(st1, et1, st2, et2);
  });

  if (dvehicles.length > 0) {
    return res
      .status(200)
      .json(new ApiResponse(200, null, "Time is clashing choose another time"));
  }
  const vehicles = await Vehicle.find({});
  const freevehicles = vehicles.filter((vehicle) => {
    if (vehicle.assignedDriver.length === 0) {
      return true;
    }
    let drivers = vehicle.assignedDriver;
    drivers = drivers.filter((driver) => {
      const st2 = parseTime(driver.starttime);
      const et2 = parseTime(driver.endtime);
      return isOverlap(st1, et1, st2, et2);
    });
    console.log(drivers, "drivers")
    return drivers.length == 0;
  });

  return res
    .status(200)
    .json(new ApiResponse(200, freevehicles, "Vehicle fetched successfully"));
});

const createVehicle = asyncHandler(async (req, res) => {
  const { brand, model, licensePlate } = req.body;
  if (!brand || !model || !licensePlate) {
    throw new ApiError(400, "All fields are required");
  }
  const vehicle = await Vehicle.create({
    brand,
    model,
    licensePlate,
    assignedDriver: [],
  });
  return res
    .status(201)
    .json(new ApiResponse(200, vehicle, "Vehicle created successfully"));
});

const getAssignedVehicle = asyncHandler(async (req, res) => {
  const { vehicleId } = req.body;
  const vehicles = await Vehicle.findById(vehicleId);
  return res
    .status(200)
    .json(new ApiResponse(200, vehicles, "Vehicle fetched successfully"));
});

export { getVehicles, createVehicle, getAssignedVehicle };
