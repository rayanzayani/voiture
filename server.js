const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const passport = require("passport");
var path = require("path");
var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var clientsRouter = require("./routes/client");
var carsRouter = require("./routes/voitures");
var locationsRouter = require("./routes/location");
var loginRouter = require("./routes/api/login");
var cookieParser = require("cookie-parser");
const app = express();

// Bodyparser middleware
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(cors({}));

app.use(cookieParser());
app.use(bodyParser.json());

// DB Config
const db = require("./config/keys").mongoURI;

// Connect to MongoDB

mongoose
  .connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB successfully connected"))
  .catch((err) => console.log(err));
// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
// Passport middleware
app.use(passport.initialize()); // Passport config
app.use(indexRouter);
app.use(usersRouter);
app.use(clientsRouter);
app.use(carsRouter);
app.use(locationsRouter);
app.use(loginRouter);
app.use(express.static("public"));
// app.use(login);
// app.use(personRoute);
require("./config/passport")(passport); // Routes
app.use(express.static(path.join(__dirname, "public")));

const port = process.env.PORT || 5000; // process.env.port is Heroku's port if you choose to deploy the app there

app.listen(port, () => console.log(`Server up and running on port ${port} !`));
