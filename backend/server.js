import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import authRoutes from "./controller/AuthController.js";
import contactusRoutes from "./controller/ContactController.js";
import packagesRoutes from "./controller/PackageController.js";
import blogRoutes from "./controller/BlogController.js";
import planTripRoutes from "./controller/TravelController.js";
import protectedRoutes from "./middleware.js";
import mapRoutes from "./controller/LocationController.js";
dotenv.config();

const app = express();
app.use(bodyParser.json());
app.use(cookieParser());

app.use(
  cors({
    origin: ["http://localhost:3000"],
    methods: ["POST", "GET", "DELETE", "PUT"],
    credentials: true,
  })
);


app.use("/auth", authRoutes);
app.use("/packages", packagesRoutes);
app.use("/contactus", contactusRoutes);
app.use("/blogs", blogRoutes);
app.use("/planTrip", planTripRoutes);
app.use("/admin", protectedRoutes);
app.use("/maps", mapRoutes);
const PORT = process.env.PORT || 8081;
app.listen(PORT, () => {
  console.log(`${PORT} is Listening`);
});
