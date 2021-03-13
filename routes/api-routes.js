const { v4: uuidv4 } = require('uuid');
const express = require("express");

//const Pick = require("../model/pick");
const Customer = require("../model/customer");

//let pick = new Pick();
let customer = new Customer();

let apiRoutes = express.Router();

//admin routes

//Customer**************************************
//new customer
apiRoutes.post("/customer/new", async (req, res) =>{
    let info = req.body.info;
	let id = uuidv4();
    let result = await customer.newCustomer(id, info.fname, info.lname, info.email, info.phone, info.address, info.city, info.prov, info.postal);
	await (result==1)?res.status(200).send('PLAYER WAS CREATED'):res.status(500).send("SOMTHING WENT WRONG");
})



module.exports = apiRoutes;