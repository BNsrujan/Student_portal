const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");

dotenv.config({ path: "./.env" });

const registerRoute = require("./routes/register.route.js");
const loginRoute = require("./routes/login.route.js");
const healthcheckRoute = require("./routes/healthcheck.route.js");

const app = express();

app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/api/v1/student", registerRoute);
app.use("/api/v1/student", loginRoute);
app.use("/api/v1", healthcheckRoute);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: "Something went wrong!",
  });
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
