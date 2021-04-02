const express = require("express");
const path = require("path");
const passport = require("passport");
const session = require('express-session')

require('dotenv').config();

const authRoutes = require("./controller/routes/auth-routes");
const apiRoutes = require("./controller/routes/api-routes");

const app = express();
const PORT = process.env.PORT || 8080;


// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// // Static directory to be served
 app.use(express.static("./public"));


app.use(session({ 
  secret: process.env.SESSION_SECRET, 
  cookie: { 
      secure: false
  }}));
app.use(passport.initialize());
app.use(passport.session());

require("./controller/routes/html-routes")(app)
app.use("/auth", authRoutes);
app.use("/api", apiRoutes);

app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });

module.exports = app