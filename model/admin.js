const pool = require("../config/connection");

class Admin {
	constructor(){
		this.pool = pool;
	}

	async newStore(id, name, email, phone, fax, address, city, prov, country, postal){
		console.log(`city - ${city}`)
		console.log(`country - ${country}`)
		let query = `INSERT INTO store (id, name, email, phone, fax, address, city, prov, country, postal, created) VALUES 
        ("${id}","${name}", "${email}", "${phone}", "${fax}", "${address}", ${city}, ${prov}, ${country}, "${postal}",CURRENT_TIMESTAMP);`;
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

module.exports = Admin;