import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

app.use(
  cors()
);

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));
app.use(cookieParser());

//routes import
import vehicleRouter from "./routes/vehicle.routes.js";
import driverRouter from "./routes/driver.routes.js";

//routes declaration
app.use("/vehicles", vehicleRouter);
app.use("/drivers", driverRouter);

export { app };
