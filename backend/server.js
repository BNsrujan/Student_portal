const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv")
const cookieParser = require("cookie-parser");
const register = require('./routes/register.route.js');
const login = require('./routes/login.route.js');

const app = express();
dotenv.config({
  path: './.env',
});

app.use(cors({
  origin: "*",
  credentials: true,
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.post("/api/v1/student/register", (req, res) => {
  const { username, email, password, semester, branch, usn, section } = req.body;
  console.log(req.body)
  if (!username || !email || !password || !semester || !branch || !usn || !section) {
    return res.status(400).json({
      success: false,
      message: "All fields are required"
    });
  }
  //mock responses
  return res.status(201).json({
    success: true,
    message: "Registration successful",
    data: {
      username,
      email,
      usn,
      semester,
      branch,
      section
    }
  });
});




app.post("/api/v1/student/login", (req, res) => {
  const { usn, password } = req.body
  console.log(req.body)

  return res.status(200).json({
    success: true,
    message: "Login successful",
    data: {
      usn,
      password
    }
  })
})


// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: "Something went wrong!"
  });
});

const port = process.env.PORT || 7000;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
