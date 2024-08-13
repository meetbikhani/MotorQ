import React, { useEffect } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";

const App = () => {
  const location = useLocation();

  useEffect(() => {
    console.log(location.pathname.split("/")[0]);
  }, [location]);

  return (
    <div>
      <nav
        className={`w-full flex justify-between items-center p-5 border-b-2 border-base-300 ${
          location.pathname.split("/")[1] === "assign" && "hidden"
        }`}
      >
        <Link to="/">
          <h1 className="text-xl md:text-3xl md:pl-10 font-semibold text-blue-500/60">Home</h1>
        </Link>
        <Link to="/create">
          <button
            className={` btn btn-outline btn-primary ${
              location.pathname === "/create" && "hidden"
            }`}
          >
            Create Driver
          </button>
        </Link>
      </nav>
      <Outlet />
    </div>
  );
};

export default App;
