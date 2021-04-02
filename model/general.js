const pool = require("../config/connection");

class General {
	constructor(){
		this.pool = pool;
	}

	async allCountries(){
		let query = `SELECT * FROM country`;
		try {
			let result = await this.pool.query(query);
			return result;
		}
		catch(error){
			return error;
		}
	}

	async allProvincesByCountry(country){
		let query = `SELECT * FROM prov WHERE country=${country}`;
		try {
			let result = await this.pool.query(query);
			return result;
		}
		catch(error){
			return error;
		}
	}
	
	async allCitiesByProvence(prov){
		let query = `SELECT * FROM city WHERE prov=${prov}`;
		try {
			let result = await this.pool.query(query);
			return result;
		}
		catch(error){
			return error;
		}
	}
	
}

module.exports = General;