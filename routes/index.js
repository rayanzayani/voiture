var express = require("express");
var router = express.Router();
const saltRounds = 10;

/* GET home page. */
router.route("/index").get(function (req, res, next) {
  res.render("index");
});
router.route("/").get(function (req, res, next) {
  res.render("index");
});

module.exports = router;
