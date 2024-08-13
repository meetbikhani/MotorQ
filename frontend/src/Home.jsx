import React, { useEffect, useState } from "react";
import axios from "./utils/axios";
import { Link } from "react-router-dom";

const Home = () => {
  const [drivers, setDrivers] = useState([]);
  const [search, setSearch] = useState("");

  const getDrivers = async () => {
    try {
      const { data } = await axios.get("/drivers/all");
      setDrivers(data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const searchHandler = (e) => {
    setSearch(e.target.value);
  };

  useEffect(() => {
    getDrivers();
  }, []);

  const searchRegex = new RegExp(search, "i");

  const filteredDrivers = drivers.filter(
    (driver) =>
      searchRegex.test(driver.name) ||
      searchRegex.test(driver.phone)
  );

  return (
    <div className="w-full">
      <div className="absolute right-[10vw] top-5 flex items-center gap-3">
        <input
          onChange={searchHandler}
          type="text"
          placeholder="Search . . . "
          className="input input-bordered input-primary w-full max-w-xs"
        />
      </div>
      <main className="w-3/4 mx-auto">
        <div className="overflow-x-auto">
          <table className="table">
            {/* head */}
            <thead>
              <tr>
                <th className="text-xl">Name</th>
                <th className="text-xl">Phone Number</th>
                <th className="text-xl">Email</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {/* rows */}
              {filteredDrivers.map((driver) => (
                <tr key={driver._id}>
                  <td>
                    <div className="flex items-center gap-3">
                      <div className="avatar">
                        <div className="mask mask-squircle h-12 w-12 flex items-center justify-center relative">
                          <h1 className="h-full w-full bg-blue-500/60 text-2xl  py-2 px-4">{driver.name[0].toUpperCase()}</h1>
                        </div>
                      </div>
                      <div>
                        <div className="font-bold text-xl capitalize">{driver.name}</div>
                      </div>
                    </div>
                  </td>
                  <td className="text-lg font-semibold">{driver.phone}</td>
                  <td className="text-lg font-semibold">{driver.email}</td>
                  <th>
                    <Link to={`/assign/${driver._id}`}>
                      <button className="btn btn-outline btn-xl">
                        Assign
                      </button>
                    </Link>
                  </th>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
};

export default Home;
