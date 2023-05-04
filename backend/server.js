const express = require("express");
const dotenv = require("dotenv");
const db = require("./config/db");
const userModal = require("./models/userModal");

const taskModal = require("./models/taskModal");
const router = require("./routes/tasks");
const cors = require("cors");
const auth = require("./routes/auth");
const app = express();
dotenv.config();
app.use(cors());

const PORT = process.env.PORT || 5001;
//test database connection
const connect = async () => {
  try {
    await db.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};
connect();

app.get("/", (req, res) => {
  res.send("API is running...");
});
//routes
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/api/tasks", router);
app.use("/api/auth", auth);

app.listen(
  PORT,
  console.log(
    `Server listening in ${process.env.NODE_ENV} mode on port ${PORT}`
  )
);
