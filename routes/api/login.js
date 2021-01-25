const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys"); // Load input validation
const validateRegisterInput = require("../../validation/register");
const validateLoginInput = require("../../validation/login"); // Load User model
const User = require("../../models/User");

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
      res.render("dashboard");
    } else {
      res.render("login");
    }
  });
});

router.route("/login").get((req, res) => {
  res.render("login");
});

// @route POST api/users/login
// @desc Login user and return JWT token
// @access Public
// router.post("/login", (req, res) => {
//   // Form validation
//   const { errors, isValid } = validateLoginInput(req.body); // Check validation
//   if (!isValid) {
//     return res.status(400).json(errors);
//   }
//   const email = req.body.email;
//   const password = req.body.password;

//   // Find user by email
//   User.findOne({
//     email: email,
//   }).then((user) => {
//     // Check if user exists
//     if (!user) {
//       return res.status(404).json({
//         emailnotfound: "UserName not found",
//       });
//     }
//     // Check password
//     bcrypt.compare(password, user.password).then((isMatch) => {
//       if (isMatch) {
//         // User matched
//         // Create JWT Payload
//         const payload = {
//           id: user.id,
//           name: user.name,
//         };
//         // Sign token
//         jwt.sign(
//           payload,
//           keys.secretOrKey,
//           {
//             expiresIn: 31556926, // 1 year in seconds
//           },
//           (err, token) => {
//             res.json({
//               success: true,
//               token: "Bearer " + token,
//             });
//           }
//         );

//         user.save();
//       } else {
//         return res.status(400).json({
//           passwordincorrect: "Password incorrect",
//         });
//       }
//     });
//   });
// });

// Redirect User
router.get("/dashboard", (req, res) => {
  res.render("dashboard");
});
router.get("/logout/", (req, res) => {
  res.render("login");
  // res.status(200).send({
  //   token: null,
  // });
});

router.post("/logout/", (req, res) => {
  const { token } = req.body;
  refreshTokens = refreshTokens.filter((token) => t !== token);

  res.send("Logout successful");
});
module.exports = router;
