var express = require("express");
var router = express.Router();
const social = require("../models/Reseaux");
const saltRounds = 10;

/* GET home page. */
router.route("/index").get(function (req, res, next) {
  social.find({}, function (err, reseaux) {
    res.render("index", {
      reseaux: reseaux,
    });
  });
});
router.route("/").get(function (req, res, next) {
  social.find({}, function (err, reseaux) {
    res.render("index", {
      reseaux: reseaux,
    });
  });
});

module.exports = router;
