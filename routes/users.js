var express = require("express");
const User = require("../models/User");
let usersRoute = express.Router();
const saltRounds = 10;

usersRoute.route("/users").get((req, res) => {
  User.find({}, function (err, users) {
    res.render("users", {
      users: users,
    });
  });
});

/** Ajouter reservation **/
usersRoute.route("/addUser").post((req, res) => {
  const newUser = new User({
    nom: req.body.nom,
    prenom: req.body.prenom,
    email: req.body.email,
    password: req.body.password,
  });
  try {
    newUser.save();
  } catch (err) {
    console.log("error!");
  }
});

/** mise à jour reservation **/
usersRoute.route("/updateUser/:id").post(function (req, res) {
  let id = req.params.id;
  User.findById(id, function (err, data) {
    data.nom = req.body.nom;
    data.prenom = req.body.prenom;
    data.email = req.body.email;
    data.password = req.body.password;

    try {
      data.save().then(res.redirect("back"));
    } catch (err) {
      console.log("errr");
    }
  });
});

usersRoute.get("/deleteUser/:id", function (req, res) {
  User.findById(req.params.id, function (err, data) {
    User.remove(
      {
        _id: req.params.id,
      },
      function (err) {
        res.redirect("back");
      }
    );
  });
});

module.exports = usersRoute;
