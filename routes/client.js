var express = require("express");
const User = require("../models/Client");
let clientsRoute = express.Router();
const saltRounds = 10;

clientsRoute.route("/clients").get((req, res) => {
  Client.find({}, function (err, clients) {
    res.render("clients", {
      clients: clients,
    });
  });
});

/** Ajouter reservation **/
clientsRoute.route("/addClient").post((req, res) => {
  const newClient = new Client({
    nom: req.body.nom,
    prenom: req.body.prenom,
    cin: req.body.cin,
    adresse: req.body.adresse,
    tel: req.body.tel,
  });
  try {
    newClient.save();
  } catch (err) {
    console.log("error!");
  }
});
clientsRoute.route("/ajouterClient").get((req, res) => {
  Client.find({}, function (err, clients) {
    res.render("ajouterClient");
  });
});

/** mise à jour reservation **/
clientsRoute.route("/updateClient/:id").post(function (req, res) {
  let id = req.params.id;
  Client.findById(id, function (err, data) {
    data.nom = req.body.nom;
    data.prenom = req.body.prenom;
    data.cin = req.body.cin;
    data.adresse = req.body.adresse;
    data.tel = req.body.tel;

    try {
      data.save().then(res.redirect("back"));
    } catch (err) {
      console.log("errr");
    }
  });
});

clientsRoute.get("/deleteClient/:id", function (req, res) {
  Client.findById(req.params.id, function (err, data) {
    Client.remove(
      {
        _id: req.params.id,
      },
      function (err) {
        res.redirect("back");
      }
    );
  });
});

module.exports = clientsRoute;
