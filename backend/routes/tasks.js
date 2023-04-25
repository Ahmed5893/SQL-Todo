const express = require("express");
const db = require("../config/db");
const { userModel, taskModel } = require("../models");
const jwt = require("jsonwebtoken");
const colors=require("colors");
const { Sequelize } = require("sequelize");
const Op = Sequelize.Op;

const router = express.Router();

function verifyToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  try {
    const decoded = jwt.verify(token, "secret");
    req.userId = decoded.id;
    next();
  } catch (err) {
    console.error(err);
    return res.status(401).json({ message: "Unauthorized" });
  }
}
//Get all tasks

router.get("/:userId", async (req, res) => {
  const { userId } = (req.params);

  if (!userId) {
    res.status(400).json({ error: "Missing userId parameter" });
    return;
  }
  await taskModel
    .findAll({ 
      where: { userId:userId },
      })
    .then((tasks) => {
      res.json(tasks);
    })
    .catch((err) => {
      console.log(err);
    });
});

// Create a new task
router.post("/add", async (req, res) => {

  const { userId,task, dueDate, priority } = req.body;
  // const userId = req.params;

  // Validate fields
  const errors = [];
  if (!task) errors.push("Please add a task");
  if (!dueDate) errors.push("Please add a date");
  if (!priority) errors.push("Please add a priority value");

  // Check for errors
  if (errors.length > 0) {
    return res.status(400).json({ errors });
  }

  try {
    // Insert into table

    const newTask = await taskModel.create({
      task,
      dueDate,
      priority,
      userId,
    });
    res.status(201).json({ task: newTask });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});


//delete task
router.delete("/delete/:id", (req, res) => {
  const taskId = req.params.id;
  taskModel
    .destroy({ where: { id: taskId } })
    .then(() => {
      res
        .status(200)
        .json({ message: `Task with id ${taskId} has been deleted.` });
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ error: "Internal server error." });
    });
});
//edit task
router.patch("/edit/:id", (req, res) => {
  const taskId = req.params.id;
  const { task, dueDate, priority } = req.body;
  taskModel
    .update({ task, dueDate, priority }, { where: { id: taskId } })
    .then(() => {
      res
        .status(200)
        .json({ message: `Task with id ${taskId} has been updated.` });
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ error: "Internal server error." });
    });
});

//task is completed
router.patch("/done/:id", (req, res) => {
  const taskId = req.params.id;
  const isCompleted = req.body.isCompleted;
  console.log(`TODO, ${JSON.stringify(req.body)}`.red.underline.bold);

  taskModel
    .update({isCompleted}, { where: { id: taskId } })
    .then(() => {
      res
        .status(200)
        .json({ message: `Task with id ${taskId} was successfully completed` });
    })
    .catch((err) => {
      res.status(500).json({ error: err });
      console.log(err);
    });
});

module.exports = router;
