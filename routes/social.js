var express = require("express");
const Reseaux = require("../models/Reseaux");
const validateRegisterInput = require("../validation/register");
let socialRoute = express.Router();
// const User = require("../models/User");
const saltRounds = 10;
/* GET home page. */
socialRoute.route("/social").get((req, res) => {
  Reseaux.find({}, function (err, socials) {
    res.render("social", {
      socials: socials,
    });
  });
});

/** Ajouter reservation **/
socialRoute.route("/addSocial").post((req, res) => {
  // Form validation
  // const { errors, isValid } = validateRegisterInput(req.body);

  // if (!isValid) {
  //   return res.status(400).json(errors);
  // }

  const newReseaux = new Reseaux({
    facebook: req.body.facebook,
    instagram: req.body.instagram,
    phone: req.body.phone,
    localisation: req.body.localisation,
    email: req.body.email,
    adresse: req.body.adresse,
  });
  try {
    newReseaux.save();
  } catch (err) {
    console.log("error!");
  }
});

/** mise à jour reservation **/
socialRoute.route("/updateSocials/:id").post(function (req, res) {
  let id = req.params.id;
  Reseaux.findById(id, function (err, data) {
    data.facebook = req.body.facebook;
    data.instagram = req.body.instagram;
    data.phone = req.body.phone;
    data.localisation = req.body.localisation;
    data.email = req.body.email;
    data.adresse = req.body.adresse;

    try {
      data.save().then(res.redirect("back"));
    } catch (err) {
      console.log("errr");
    }
  });
});

/** liste des reservation **/
// socialRoute.route("/social").get((req, res) => {
//   Reseaux.find({}, function (err, socials) {
//     res.render("/social", {
//       socials: socials,
//     });
//   });
// });

module.exports = socialRoute;
