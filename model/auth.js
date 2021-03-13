const pool = require("../config/connection");

class Auth {
	constructor(){
		this.pool = pool;
	}

	//get the full schedule
	async registerUser(id, firstName, lastName, email, phone, password){
		let query = `INSERT INTO user (id, name_first, name_last, email, phone, password) VALUES ('${id}','${firstName}', '${lastName}', '${email}', '${phone}', '${password}');`;
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
module.exports = Auth;