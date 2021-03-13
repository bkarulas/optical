const express = require("express");
const bcrypt = require('bcrypt');
const { v4: uuidv4 } = require('uuid');


const Auth = require("../model/auth");

let auth = new Auth();

let authRoutes = express.Router();

authRoutes.post("/register", async (req, res) => {
    let password = await bcrypt.hash(req.body.password, 10)
    let id = uuidv4();
    let firstName = req.body.fname;
    let lastName = req.body.lname;
    let email = req.body.email;
    let phone = req.body.phone
    let result = await auth.registerUser(id, firstName, lastName, email, phone, password)
    if (result==1){
        res.status(200).redirect('../login')
        
    } else {
        res.status(500).redirect('../register')
    }
    
});







module.exports = authRoutes