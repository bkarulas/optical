// Dependencies
const path = require("path");
const isAuthenticated = require("../isAuthenticated");
const notAuthenticated = require("../notAuthenticated")


// Routes
module.exports = function(app) {

  // Each of the below routes just handles the HTML page that the user gets sent to.

  // index route loads index.html
  app.get("/", isAuthenticated, function(req, res) {
    res.sendFile(path.join(__dirname, "../../public/pages/index.html"));
  });

  app.get("/login", notAuthenticated, function(req, res) {
    res.sendFile(path.join(__dirname, "../../public/pages/login.html"));
  });

  app.get("/signup", notAuthenticated, function(req, res) {
    res.sendFile(path.join(__dirname, "../../public/pages/signup.html"));
  });

  app.get("/customer", isAuthenticated, function(req, res) {
    res.sendFile(path.join(__dirname, "../../public/pages/customer.html"));
  });

  app.get("/store", isAuthenticated, function(req, res) {
    res.sendFile(path.join(__dirname, "../../public/pages/profile/store.html"));
  });

};


// // The routes for 

// const express = require("express");
// const path = require("path");
// const isAuthenticated = require("../isAuthenticated");

// var htmlRoutes = express.Router();

// htmlRoutes.get('/login', function(req, res){
//     let loginPage = path.join(__dirname, "../../public/login.html");
//     res.sendFile(loginPage);
// });

// htmlRoutes.get('/signup', function(req, res){
//     let signupPage = path.join(__dirname, "../../public/signup.html");
//     res.sendFile(signupPage);
// });

// htmlRoutes.get('/', isAuthenticated, function(req, res){
//     let homePage = path.join(__dirname, "../../public/index.html");
//     res.sendFile(homePage);
// });

// module.exports = htmlRoutes;

