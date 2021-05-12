const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys"); // Load input validation
const validateRegisterInput = require("../../validation/register");
const validateLoginInput = require("../../validation/login"); // Load User model
const User = require("../../models/User");
const Client = require("../../models/Client");

const saltRounds = 10;

// @route POST api/users/register
// @desc Register user
// @access Public
router.route("/login").post((req, res) => {
  User.findOne({
    email: req.body.email,
    password: req.body.password,
  }).then((user) => {
    if (user) {
      res.render("index");
    } else {
      res.render("login");
    }
  });
});

// @route POST api/users/register
// @desc Register user
// @access Public
router.route("/loginCustomer").post((req, res) => {
  Client.findOne({
    email: req.body.email,
    password: req.body.password,
  }).then((user) => {
    if (user) {
      res.setHeader('Set-Cookie', [`userEmail=${user.email}`, `userID=${user.id}`])
      
      res.render("customerIndex");
    } else {
      res.render("customerLogin");
    }
  });
});

router.route("/loginCustomer").get((req, res) => {
  res.clearCookie("userEmail");
  res.clearCookie("userID");
  res.render("customerLogin");
});

router.route("/login").get((req, res) => {
  res.render("login");
});

// Redirect User
router.get("/dashboard", (req, res) => {
  res.render("dashboard");
});
router.get("/logout/", (req, res) => {
  res.render("login");
});
router.get("/logoutCustomer/", (req, res) => {
  res.clearCookie("userID");
  res.clearCookie("userEmail");
  res.render("customerLogin");
});

router.post("/logout/", (req, res) => {
  const { token } = req.body;
  refreshTokens = refreshTokens.filter((token) => t !== token);

  res.send("Logout successful");
});
module.exports = router;
