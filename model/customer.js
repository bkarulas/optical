const pool = require("../config/connection");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;



class Customer {
	constructor(){
		this.pool = pool;
	}

	//create a new player
	async newCustomer(id,fname,lname,email,hphone,cphone,wphone,address,city,prov,counrty,postal,plan,store){
		passport.use(new LocalStrategy( 
			function(username) {
			  console.log("Customer")
			  console.log(username)
			})
			)
		let query = `INSERT INTO customer (id, fname, lname, email, hphone, cphone, wphone, address, city, prov, country, postal,plan, store, created) VALUES 
        ('${id}','${fname}', '${lname}', '${email}', '${hphone}', '${cphone}', '${wphone}', '${address}', '${city}', ${prov}, ${counrty}, '${postal}',${plan},'${store}', CURRENT_TIMESTAMP);`;
		console.log(query)
		try {
			await this.pool.query(query);
			return 1;
		}
		catch(error){
			return error;
		}
	}

	async allCustomers(store){
		let query = `SELECT c.id, c.fname, c.lname, c.email, c.hphone, c.cphone, c.wphone, c.address, ci.name AS city, p.name AS prov, co.name AS country, c.postal, c.updated 
		FROM customer c
        INNER JOIN city ci ON ci.id = c.city
		INNER JOIN prov p ON p.id = c.prov
        INNER JOIN country co ON co.id = c.country
		WHERE active = true AND c.store = '${store}'
		ORDER by lname, fname; `;
		try {
			let result = await this.pool.query(query);
			return result;
		}
		catch(error){
			return error;
		}
	}
	//edit customer
	async editCustomer(id,fname,lname,email,hphone,cphone,wphone,address,city,prov,counrty,postal){
		let query = `UPDATE customer SET fname='${fname}', lname='${lname}', email='${email}', hphone='${hphone}', cphone='${cphone}', wphone='${wphone}', address='${address}', city='${city}', prov=${prov}, country=${counrty}, postal='${postal}', updated=CURRENT_TIMESTAMP
			WHERE id='${id}';`
		console.log(query);
		try {
			await this.pool.query(query);
			return 1;
		}
		catch(error){
			return error;
		}
	}


	async oneCustomers(id){
		let query = `SELECT c.id, c.fname, c.lname, c.email, c.hphone, c.cphone, c.wphone, c.address, c.city AS cityId, ci.name AS city, c.prov AS provId, p.name AS province, c.country AS counrtyId, co.name AS country, c.postal, c.store AS storeId, s.name AS store, c.plan, c.family AS family, c.created, c.updated 
			FROM customer c
			INNER JOIN city ci ON ci.id = c.city
			INNER JOIN prov p ON p.id = c.prov
			INNER JOIN country co ON co.id = c.country
			INNER JOIN store s ON s.id = c.store
			WHERE c.id = '${id}'`;
		try {
			let result = await this.pool.query(query);
			return result;
		}
		catch(error){
			return error;
		}
	}

	//delete customer
	async deleteCustomerById(id){
		let query = `UPDATE customer SET active=false, updated=CURRENT_TIMESTAMP
			WHERE id='${id}';`
		try {
			await this.pool.query(query);
			return 1;
		}
		catch(error){
			return error;
		}
	}

	
	
}

module.exports = Customer;