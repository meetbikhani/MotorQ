import React from "react";
import { NavLink, Outlet, useParams } from "react-router-dom";

const Assign = () => {
  const { driverId } = useParams();

  const getActiveClass = ({ isActive }) =>
    isActive ? "btn btn-primary text-white" : "btn btn-outline btn-primary";

  return (
    <div>
      <nav className="flex justify-between gap-10 items-center p-5">
        <NavLink to="/" className={({ isActive }) => isActive ? "text-xl md:text-3xl md:pl-10 font-semibold text-blue-800" : "text-xl md:text-3xl md:pl-10 font-semibold text-blue-500/60"}>
          Home
        </NavLink>
        <div className="flex items-center gap-10">
        <NavLink to={`assigned/${driverId}`} className={getActiveClass}>
          Assigned
        </NavLink>
        <NavLink to={`assign/${driverId}`} className={getActiveClass}>
          Assign
        </NavLink>
        </div>
      </nav>
      <Outlet />
    </div>
  );
};

export default Assign;
