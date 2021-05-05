var express = require("express");
const User = require("../models/Client");
let userRoute = express.Router();
const saltRounds = 10;

userRoute.route("/userReservation").get((req, res) => {
  Client.find({}, function (err, clients) {
    res.render("clients", {
      clients: clients,
    });
  });
});





module.exports = userRoute;
