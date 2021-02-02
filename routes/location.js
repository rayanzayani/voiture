var express = require("express");
const Client = require("../models/Client");
const Car = require("../models/Car");
let locationsRoute = express.Router();

locationsRoute.route("/users").get((req, res) => {
  User.find({}, function (err, users) {
    res.render("users", {
      users: users,
    });
  });
});
locationsRoute.route("/ajouterUser").get((req, res) => {
  User.find({}, function (err, users) {
    res.render("ajouterUser");
  });
});

/** Ajouter reservation **/
locationsRoute.route("/addUser").post((req, res) => {
  const newUser = new User({
    nom: req.body.nom,
    prenom: req.body.prenom,
    email: req.body.email,
    password: req.body.password,
  });
  try {
    newUser.save().then(
      setTimeout(() => {
        res.redirect("users");
      }, 2000)
    );
  } catch (err) {
    console.log("error!");
  }
});

/** mise à jour reservation **/
locationsRoute.route("/updateUser/:id").post(function (req, res) {
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

locationsRoute.get("/deleteUser/:id", function (req, res) {
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

module.exports = locationsRoute;
