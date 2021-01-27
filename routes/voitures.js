var express = require("express");
const Car = require("../models/Car");
let carsRoute = express.Router();
const saltRounds = 10;

carsRoute.route("/cars").get((req, res) => {
  Car.find({}, function (err, cars) {
    res.render("voitures", {
      cars: cars,
    });
  });
});

carsRoute.route("/ajouterVoiture").get((req, res) => {
  res.render("ajouterVoiture");
});

/** Ajouter reservation **/
carsRoute.route("/addCar").post((req, res) => {
  const newCar = new Car({
    marque: req.body.marque,
    modele: req.body.modele,
    couleur: req.body.couleur,
    matricule: req.body.matricule,
    annee: req.body.annee,
    carburant: req.body.carburant,
  });
  try {
    newCar.save();
  } catch (err) {
    console.log("error!");
  }
  res.redirect("ajouterVoiture");
});

/** mise à jour reservation **/
carsRoute.route("/updateCar/:id").post(function (req, res) {
  let id = req.params.id;
  Car.findById(id, function (err, data) {
    data.marque = req.body.marque;
    data.modele = req.body.modele;
    data.couleur = req.body.couleur;
    data.matricule = req.body.matricule;
    data.annee = req.body.annee;
    data.carburant = req.body.carburant;

    try {
      data.save().then(res.redirect("back"));
    } catch (err) {
      console.log("errr");
    }
  });
});

carsRoute.get("/deleteCar/:id", function (req, res) {
  Car.findById(req.params.id, function (err, data) {
    Car.remove(
      {
        _id: req.params.id,
      },
      function (err) {
        res.redirect("back");
      }
    );
  });
});

module.exports = carsRoute;
