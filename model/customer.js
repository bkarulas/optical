const pool = require("../config/connection");

class Customer {
	constructor(){
		this.pool = pool;
	}

	//create a new player
	async newCustomer(id,fname,lname,email,phone,address,city,prov,postal){
		let query = `INSERT INTO customer (id, fname, lname, email, phone, address, city, prov, postal, created) VALUES 
        ('${id}','${fname}', '${lname}', '${email}', '${phone}', '${address}', '${city}', ${prov}, '${postal}',CURRENT_TIMESTAMP);`;
		console.log(query)
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