import React, { useEffect, useState } from "react";
import axios from "./utils/axios";
import { Link, useNavigate, useParams } from "react-router-dom";

const Assign = () => {
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [vehicles, setVehicles] = useState([]);
  const { driverId } = useParams();
  const navigate = useNavigate();

  const getVehicles = async () => {
    try {
      const requestBody = {
        driverId,
        starttime: startTime,
        endtime: endTime,
      };
      const { data } = await axios.post("/vehicles/get-vehicle", requestBody);
      if(data.data == null){
        alert("Driver is not free, please select another time");
      }
      else{
      setVehicles(data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleStartTimeChange = (event) => {
    setStartTime(event.target.value);
  };

  const handleEndTimeChange = (event) => {
    setEndTime(event.target.value);
  };

  const assignVehicle = async (vehicleId) => {
    try {
      const requestBody = {
        vehicleId: vehicleId,
        driverId: driverId,
        starttime: startTime,
        endtime: endTime,
      };
      const { data } = await axios.post("/drivers/assign-vehicle", requestBody);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <div className="flex items-center justify-center gap-5 mt-10">
        <div className="flex items-center gap-2">
          <label htmlFor="start-time">Start Time:</label>
          <input
            type="time"
            id="start-time"
            name="start-time"
            className="input input-bordered max-w-xs"
            value={startTime}
            onChange={handleStartTimeChange}
          />
        </div>
        <div className="flex items-center gap-2">
          <label htmlFor="end-time">End Time:</label>
          <input
            type="time"
            id="end-time"
            name="end-time"
            className="input input-bordered max-w-xs"
            value={endTime}
            onChange={handleEndTimeChange}
          />
        </div>
        <button
          onClick={getVehicles}
          type="submit"
          className="btn btn-outline"
        >
          Submit
        </button>
      </div>
      <table className="table w-3/4 mx-auto">
        {/* head */}
        <thead>
          <tr>
            <th className="text-xl">Brand</th>
            <th className="text-xl">Model</th>
            <th className="text-xl">License Plate</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {/* rows */}
          {vehicles.length>0 &&vehicles.map((vehicle) => (
            <tr key={vehicle._id}>
              <td>
                <div className="flex items-center gap-3">
                  <div>
                    <div className="font-bold text-xl">{vehicle.brand}</div>
                  </div>
                </div>
              </td>
              <td className="text-lg font-semibold">{vehicle.model}</td>
              <td className="text-lg font-semibold">{vehicle.licensePlate}</td>
              <th>
                <button
                  onClick={() => {
                    assignVehicle(vehicle._id);
                    navigate(`/assign/${driverId}/assigned/${driverId}`);
                    window.location.reload();
                  }}
                  className="btn btn-active btn-xl border-2 border-white"
                >
                  Assign
                </button>
              </th>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Assign;
