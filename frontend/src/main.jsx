import { Children, StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, Router, RouterProvider } from "react-router-dom";
import "./index.css";
import Home from "./Home.jsx";
import CreateDriver from "./CreateDriver.jsx";
import Assignment from "./Assignment.jsx";
import App from "./App.jsx";
import Assigned from "./Assigned.jsx";
import Assign from "./Assign.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/create",
        element: <CreateDriver />,
      },
    ]
  },
  {
    path: "/assign/:driverId",
    element: <Assignment />,
    children: [
      {
        path: "assigned/:driverId",
        element: <Assigned />,
      },
      {
        path: "assign/:driverId",
        element: <Assign />,
      }
    ]
  },
]);

createRoot(document.getElementById("root")).render(
    <RouterProvider router={router} />
);
