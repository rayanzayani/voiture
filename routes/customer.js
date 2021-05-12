var express = require("express");
const Car = require("../models/Car");
const Client = require("../models/Client");
const User = require("../models/Client");
const Location = require("../models/Location");
let customersRouter = express.Router();

let GetId = function getUserId(req) {
  let tab = req.get("Cookie").split(";");
  let u = "";
  /*if (tab.length == 1) {
    return tab[0].trim().split("=")[1];
  } else {*/
    for (let i = 0; i < tab.length; i++) {
      if (tab[i].indexOf("userID") == 2) {
        u = tab[i].trim().split("=")[1];
        console.log("id",u);
      }
    }
    return u;
  //}
};

function readCookie(req,name) {
  var nameEQ = name + "=";
  var ca = req.get("Cookie").split(";");
  for(var i=0;i < ca.length;i++) {
      var c = ca[i];
      while (c.charAt(0)==' ') c = c.substring(1,c.length);
      if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
  }
  return null;
}

let GetUserEmail = function getUserEmail(req) {
  let tab = req.get("Cookie").split(";");
  console.log("tabbb",tab);
  let u = "";
  /*if (tab.length == 1) {
    return tab[0].trim().split("=")[1];
  } else {*/
    for (let i = 0; i < tab.length; i++) {
      if (tab[i].indexOf("userEmail") == 1) {
        u = tab[i].trim().split("=")[1];
        console.log("email",u);
      }
    }
    return u;
  //}
};

let get_cookies = function(req) {
  var cookies = {};
  req.headers && req.headers.cookie.split(';').forEach(function(cookie) {
    var parts = cookie.match(/(.*?)=(.*)$/)
    cookies[ parts[1].trim() ] = (parts[2] || '').trim();
  });
  return cookies;
};

customersRouter.route("/customerIndex").get(function (req, res, next) {
  res.render("customerIndex");
});


customersRouter.route("/customerReservations").get(function (req, res, next) {
  let userEmail = get_cookies(req)["userEmail"];
  console.log("emaaaaaaaaail",userEmail);
  Location.find({"email":userEmail}, function (err, locations) {
    Car.find({}, function(err, cars){
      console.log("locs",locations);
      res.render("customerReservations",{
      locations:locations,
      cars:cars
    });
    });
  });
  
});

customersRouter.route("/updateCustomerReservation/:id").post(function (req, res) {
  let id = req.params.id;
  Location.findById(id, function (err, data) {
    data.dateDeb = req.body.dateDeb;
    data.dateFin = req.body.dateFin;
    data.email = req.body.email;
    data.car = req.body.car;

    try {
      data.save().then(res.redirect("back"));
    } catch (err) {
      console.log("errr");
    }
  });
});

customersRouter.get("/deleteCustomerReservation/:id", function (req, res) {
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

customersRouter.route("/customerProfile").get(function (req, res, next) {
  let userId = readCookie(req,"userID");
  let id = GetId(req);
  Client.findById(userId, function (err, client) {
    res.render("customerProfile",{
      client:client
    });
  });
  
});

/************* update profile  *************/
customersRouter.route("/updateProfile/:id").post(function (req, res) {
  let id = GetId(req);
  Client.findById(id, function (err, data) {
    data.nom = req.body.nom;
    data.prenom = req.body.prenom;
    data.cin = req.body.cin;
    data.tel = req.body.tel;
    data.adresse = req.body.addresse;
    data.email = req.body.email;
    data.password = req.body.password;
        try {
          data.save().then(res.redirect("back"));
        } catch (err) {
          console.log("errr");
        }
  });
});




module.exports = customersRouter;
