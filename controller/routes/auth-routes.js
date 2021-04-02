const express = require("express");
const bcrypt = require("bcryptjs");
const path = require("path");
const { v4: uuidv4 } = require('uuid');
const isAuthenticated = require("../isAuthenticated");
const Auth = require("../../model/auth"); // TBD the model files
const passport = require("../../config/authConfigLocal");
const saltRounds = 10;
let auth = new Auth();


let checkUserExists = function(req, res, next){
    let email = req.body.info.email;
    let emailExists = auth.emailExists(email);
    emailExists.then(function(response){
        if (!response) {
            next();
        } else {
            res.status('400').send('ERROR: User with this email already exists');
        }
    })
    .catch(err => {
        throw err
    })
}

let hash = async function(password) {
    let hash = await bcrypt.hash(password, saltRounds);
    return hash;
}


var apiAuth = express.Router();

apiAuth.post('/login', passport.authenticate("local", {failureMessage: 'Incorrect user name or password'}), function(req, res){
    res.send('Success');
});


apiAuth.post('/signup', checkUserExists, async function(req, res){
    let id = uuidv4();
    let fname = req.body.info.firstName;
    let lname = req.body.info.lastName;
    let email = req.body.info.email;
    let password = req.body.info.password;
    let hashed = await hash(password, 10); //hash the password before saving;
    auth.addNew(id, fname, lname, email, hashed)
    .then(function(response) {res.send('200')})
    .catch(function(err) {res.status(500).send('There was an error creating user: '+err)});
});


apiAuth.get('/logout', function(req, res){
    req.logout();
    res.redirect('/login');
});




module.exports = apiAuth;