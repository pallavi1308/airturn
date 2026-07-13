const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const authRoutes = require("./modules/auth/routes/authRoutes");
const app = express();
const turnaroundRoutes = require("./modules/turnarounds/routes/turnaroundRoutes");
const taskRoutes = require("./modules/tasks/routes/taskRoutes");
const dashboardRoutes = require("./modules/dashboard/routes/dashboardRoutes");
const handoverRoutes = require("./modules/handovers/routes/handoverRoutes");

app.use(cors());
app.use(helmet());
app.use(morgan("dev"));
app.use(express.json());
app.use(cookieParser());
app.use("/api/auth", authRoutes);
app.use("/api/turnarounds", turnaroundRoutes);
app.use("/api/tasks", taskRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/handovers", handoverRoutes);

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "AirTurn API Running",
  });
});

module.exports = app;