var express = require("express");
const Client = require("../models/Client");
const Car = require("../models/Car");
const Location = require("../models/Location");
let locationsRoute = express.Router();

locationsRoute.route("/locations").get((req, res) => {
  Location.find({},function(err,locations){
    res.render("locations", {
      locations: locations,
    });
  });
});



locationsRoute.route("/ajouterLocation").get((req, res) => {
  Client.find({}, function (err, clients) {
    Car.find({}, function (err, cars) {
      res.render("ajouterLocation", { cars: cars, clients: clients });
    });
  });
});

/** Ajouter reservation **/
locationsRoute.route("/addLocation").post((req, res) => {
  const newLocation = new Location({
    dateDeb: req.body.dateDeb,
    dateFin: req.body.dateFin,
    voiture: req.body.voiture,
    email: req.body.email,
  });
  try {
    newLocation.save().then(
      setTimeout(() => {
        res.redirect("locations");
      }, 2000)
    );
  } catch (err) {
    console.log("error!");
  }
});

/** mise à jour reservation **/
locationsRoute.route("/updateLocation/:id").post(function (req, res) {
  let id = req.params.id;
  Location.findById(id, function (err, data) {
    data.dateDeb = req.body.dateDeb;
    data.dateFin = req.body.dateFin;
    data.email = req.body.email;
    data.voiture = req.body.car;

    try {
      data.save().then(res.redirect("back"));
    } catch (err) {
      console.log("errr");
    }
  });
});

locationsRoute.get("/deleteLocation/:id", function (req, res) {
  Location.findById(req.params.id, function (err, data) {
    Location.remove(
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
