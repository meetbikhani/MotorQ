import React, { useEffect, useState } from "react";
import axios from "./utils/axios";
import { useParams } from "react-router-dom";

const Assigned = () => {
  const [vehicles, setVehicles] = useState([]);
  const [assigned, setAssigned] = useState([]);
  const { driverId } = useParams();

  const getDrivers = async () => {
    try {
      const { data } = await axios.post("/drivers/vehicles", { driverId });
      console.log(data.data);
      data.data.map((vehicle) => {
        getAssigned(vehicle);
      });
    } catch (error) {
      console.log(error);
    }
  };
  const getAssigned = async (vehicle) => {
    try {
      const { data } = await axios.post("/vehicles/assigned-vehicles", {
        vehicleId: vehicle.vehicleid,
      });
      const veh = {
        vehicle: data.data,
        starttime: vehicle.starttime,
        endtime: vehicle.endtime,
      };
      console.log(veh, "lo");
      setAssigned((prev) => (prev = [...prev, veh]));
    } catch (error) {
      console.log(error);
    }
  };

  const unassign = async (vehicle) => {
    try {
      const { data } = await axios.post("/drivers/unassign-vehicle", {
        vehicleId: vehicle.vehicle._id,
        driverId: driverId,
      });
      setAssigned((prev) =>
        prev.filter((veh) => veh.vehicleid !== vehicle.vehicleid)
      );
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getDrivers();
  }, [vehicles]);

  return (
    <div>
      <table className="table w-3/4 mx-auto">
        {/* head */}
        <thead>
          <tr>
            <th className="text-xl">Name</th>
            <th className="text-xl">Brand</th>
            <th className="text-xl">License Plate</th>
            <th className="text-xl">Start Time</th>
            <th className="text-xl">End Time</th>
          </tr>
        </thead>
        <tbody>
          {/* rows */}
          {assigned.map((vehicle, index) => (
            <tr key={index}>
              <td>
                <div className="flex items-center gap-3">
                  <div>
                    <div className="font-bold text-xl">
                      {vehicle.vehicle.brand}
                    </div>
                  </div>
                </div>
              </td>
              <td className="text-lg font-semibold">{vehicle.vehicle.model}</td>
              <td className="text-lg font-semibold">
                {vehicle.vehicle.licensePlate}
              </td>
              <td className="text-lg font-semibold">{vehicle.starttime}</td>
              <td className="text-lg font-semibold">{vehicle.endtime}</td>
              <th>
                <button
                  onClick={() => {
                    unassign(vehicle);
                    window.location.reload();
                  }}
                  className="btn btn-outline"
                >
                  Unassign
                </button>
              </th>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Assigned;
