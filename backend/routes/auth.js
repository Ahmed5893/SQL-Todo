const express = require("express");
const db = require("../config/db");
const userModal = require("../models/userModal");

const taskModal = require("../models/taskModal");
const Sequelize = require("sequelize");
const jwt = require("jsonwebtoken");
const bcryptjs = require("bcryptjs");
const { userModel } = require("../models");

const auth = express.Router();

//Sign Up
auth.post("/signup", async (req, res) => {
  const { name, email, password } = req.body;
  const salt = bcryptjs.genSaltSync(10);
  const hashed_password = bcryptjs.hashSync(password, salt);
  try {
    const userExist = await userModel.findOne({ where: { email: email } });
    if (userExist) {
      return res.status(401).json({ detail: "User already exist" });
    }
    await userModel.create({ name, email, hashed_password });
    const token =  jwt.sign({ email }, "secret", { expiresIn: "1hr" });
    const user = await userModel.findOne({ where: { email: email } });
    res.json({ id: user.id, name: user.name, email: user.email, token });
  } catch (err) {
    res.json({ detail: err.detail });
  }
});

//Login
auth.post("/login", async (req, res) => {

  const { email, password } = req.body;

  try {
    const user = await userModel.findOne({ where: { email: email } });
    if (!user) {
      return res.status(401).json({ detail: "User not found" });
    }
    const success = await bcryptjs.compare(password, user.hashed_password);
    const token = jwt.sign({ id: user.id }, "secret", { expiresIn: "1hr" });
    if (success) {
      res.json({ id: user.id, name: user.name, email: user.email, token });
    } else {
      return res.status(401).json({ detail: "Login failed" });
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json({ detail: "Internal server error" });
  }
});

module.exports = auth;
