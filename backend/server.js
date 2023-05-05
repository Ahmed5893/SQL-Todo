const express = require("express");
const dotenv = require("dotenv");
const db = require("./config/db");
const userModal = require("./models/userModal");
const path = require('path');
const cors = require("cors");
const auth = require("./routes/auth");
const taskModal = require("./models/taskModal");
const router = require("./routes/tasks");

const app = express();
dotenv.config();
app.use(cors());

// Connect to the database
const connect = async () => {
  try {
    await db.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};
connect();

// Serve the static files
const buildPath = path.join(__dirname, "../frontend/dist");
app.use(express.static(buildPath));

// Route for index.html
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/dist/index.html"), function (
    err
  ) {
    if (err) {
      res.status(500).send(err);
    }
  });
});

// Routes for API
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/api/tasks", router);
app.use("/api/auth", auth);

const PORT = process.env.PORT || 5001;

app.listen(PORT, console.log(`Server listening on port ${PORT}`));
