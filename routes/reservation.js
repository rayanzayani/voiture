var express = require("express");
const Reservation = require("../models/Reservation");
const User = require("../models/User");
const validateRegisterInput = require("../validation/register");
let reservationRoute = express.Router();
// const User = require("../models/User");
const saltRounds = 10;
/* GET home page. */
reservationRoute.route("/reservation").get((req, res) => {
  res.render("reservation");
});

/** Ajouter reservation **/
reservationRoute.route("/addReservation").post((req, res) => {
  // Form validation
  // const { errors, isValid } = validateRegisterInput(req.body);

  // if (!isValid) {
  //   return res.status(400).json(errors);
  // }

  const newReservation = new Reservation({
    nom: req.body.nom,
    prenom: req.body.prenom,
    cin: req.body.cin,
    email: req.body.email,
    phone: req.body.phone,
    date: req.body.date,
    startDate: req.body.startDate,
    endDate: req.body.endDate,
    nbrPersonne: req.body.nbrPersonne,
    motif: req.body.motif,
  });
  try {
    newReservation.save();
  } catch (err) {
    console.log("error!");
  }
  res.redirect("back");
});

/** supprimer reservation **/
reservationRoute.get("/deleteReservation/:id", function (req, res) {
  Reservation.findById(req.params.id, function (err, data) {
    Reservation.remove(
      {
        _id: req.params.id,
      },
      function (err) {
        res.redirect("back");
      }
    );
  });
});

/** mise à jour reservation **/
reservationRoute.route("/updateReservation/:id").post(function (req, res) {
  let id = req.params.id;
  Reservation.findById(id, function (err, data) {
    data.nom = req.body.nom;
    data.prenom = req.body.prenom;
    data.cin = req.body.cin;
    data.email = req.body.email;
    data.phone = req.body.phone;
    data.date = req.body.date;
    data.startDate = req.body.startDate;
    data.endDate = req.body.endDate;
    data.nbrPersonne = req.body.nbrPersonne;
    data.motif = req.body.motif;

    try {
      data.save().then(res.redirect("back"));
    } catch (err) {
      console.log("errr");
    }
  });
});

/** liste des reservation **/
reservationRoute.route("/reservations").get((req, res) => {
  Reservation.find({}, function (err, reservations) {
    res.render("reservations", {
      reservations: reservations,
    });
  });
});

module.exports = reservationRoute;
