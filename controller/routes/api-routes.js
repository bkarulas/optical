const { v4: uuid } = require('uuid');
const express = require("express");

const Customer = require("../../model/customer");
const General = require("../../model/general");
const Admin = require("../../model/admin")

let customer = new Customer();
let general = new General();
let admin = new Admin();

let apiRoutes = express.Router();

//GENERAL**************************************
//all countries
apiRoutes.post("/general/country", async (req, res) =>{
    let result = await general.allCountries();
    if (result[0]) {
        if (result[0].length > 0) {
            res.json(result[0]);
        } else {
            res.json({"error":"Country"});
        }
    } else {
        res.json({"error":"SQL query returned undefined result"});
    }
});

//all provinces
apiRoutes.post("/general/province", async (req, res) =>{
    let country = req.body.info;
    console.log(country);
    let result = await general.allProvincesByCountry(country);
    if (result[0]) {
        if (result[0].length > 0) {
            res.json(result[0]);
        } else {
            res.json({"error":"Provences"});
        }
    } else {
        res.json({"error":"SQL query returned undefined result"});
    }
});

//all cities
apiRoutes.post("/general/city", async (req, res) =>{
    let prov = req.body.info;
    console.log(prov);
    let result = await general.allCitiesByProvence(prov);
    if (result[0]) {
        if (result[0].length > 0) {
            res.json(result[0]);
        } else {
            res.json({"error":"City"});
        }
    } else {
        res.json({"error":"SQL query returned undefined result"});
    }
});

//logged in user

apiRoutes.get("/general/loggedinuser", async (req, res) =>{
    let user = await JSON.stringify(req.user)
    res.json(user);
});


//Admin**************************************
//new store
apiRoutes.post("/admin/store/new", async (req, res) =>{
    let info = req.body.info;
    console.log(`city-api - ${info.city}`)
    console.log(`country-api - ${info.country}`)
	let id = uuid();
    let result = await admin.newStore(id,info.name,info.email,info.phone,info.fax,info.address,info.city,info.prov,info.country,info.postal);
	await (result==1)?res.status(200).send('PLAYER WAS CREATED'):res.status(500).send("SOMTHING WENT WRONG");
})


//Customer**************************************
//new customer
apiRoutes.post("/customer/new", async (req, res) =>{
    //get the store that the Admin is linked to
    let adminStore = JSON.parse(JSON.stringify(req.user))[0].store;
    let info = req.body.info;
	let id = uuid();
    let result = await customer.newCustomer(id, info.fname, info.lname, info.email, info.hphone, info.cphone, info.wphone, info.address, info.city, info.prov, info.country, info.postal, info.plan, adminStore);
	await (result==1)?res.status(200).send('PLAYER WAS CREATED'):res.status(500).send("SOMTHING WENT WRONG");
})

//edit customer
apiRoutes.post("/customer/edit", async (req, res) =>{
    let info = req.body.info;
    console.log(info)
    let result = await customer.editCustomer(info.id, info.fname, info.lname, info.email, info.hphone, info.cphone, info.wphone, info.address, info.city, info.prov, info.country, info.postal);
	await (result==1)?res.status(200).send('PLAYER WAS UPDATED'):res.status(500).send("SOMTHING WENT WRONG");
})

//all customers
apiRoutes.get("/customer/all", async (req, res) =>{
    let adminStore = JSON.parse(JSON.stringify(req.user))[0].store;
    let result = await customer.allCustomers(adminStore);
    if (result[0]) {
        if (result[0].length > 0) {
            res.json(result[0]);
        } else {
            res.json({"error":"NO Customers"});
        }
    } else {
        res.json({"error":"SQL query returned undefined result"});
    }
});

//one customer
apiRoutes.post("/customer/one", async (req, res) =>{
    let id = req.body.info;
    console.log(id)
    let result = await customer.oneCustomers(id);
    if (result[0]) {
        if (result[0].length > 0) {
            res.json(result[0]);
        } else {
            res.json({"error":"NO Customers With That ID"});
        }
    } else {
        res.json({"error":"SQL query returned undefined result"});
    }
});

//delete customer
apiRoutes.post("/customer/delete", async (req, res) =>{
    let id = req.body.info;
    console.log(id);
    let result = await customer.deleteCustomerById(id);
    await (result==1)?res.status(200).send('CUSTOMER WAS DELETED'):res.status(500).send("SOMTHING WENT WRONG");
});

module.exports = apiRoutes;