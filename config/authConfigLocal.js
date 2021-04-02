const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const Auth = require("../model/auth"); //TBD
const bcrypt = require("bcryptjs");

let auth = new Auth();
//var db = require("../models"); TBD

passport.use(new LocalStrategy( 
    function(username, password, done) {
      console.log("here")
      console.log(username)
      console.log(password)
      auth.getUserByEmail(username)
      .then(async function(userInfo){
        let result;
        if (userInfo.length < 1) {
          result = false;
        } else {
          userInfo = JSON.parse(JSON.stringify(userInfo[0]))
          result = await bcrypt.compare(password, userInfo[0].password);
        }
        if (!result) {
            done(null, false, {message: 'Incorrect email or password'});
          } else {
            done(null, userInfo[0]);
          } 
      })
      .catch(function(err){
        console.log ("NO GOOD")
        throw err;
      })
    })); 



passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  auth.getUserByID(id)
  .then(function(result){
    let userObj = result[0];
    done(null, userObj);
  })
  .catch()
});

// Exporting our configured passport
module.exports = passport;