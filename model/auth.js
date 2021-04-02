const pool = require('../config/connection');

class Auth {
    constructor(){        
        this.pool = pool;
    }
    async getAllusers(){
        let query =`SELECT * FROM admin`;
        try {
			let result = await this.pool.query(query);
			return result;
		}
		catch(error){
			return error;
		}
    };

    async getUserByID(id){
        let query=`SELECT * from admin where id = '${id}';`;
        try {
            let result = await this.pool.query(query);
            return result;
        }
        catch(error){
            return error;
        }
    }

    async getUserByEmail(email){
        let query=`SELECT * from admin where email = '${email}';`;
        try {
            let result = await this.pool.query(query);
            return result;
        }
        catch(error){
            return error;
        }
    }


    async addNew(id, fname, lname, email, password){
        let query =`INSERT into admin(id, password, email, fname, lname) 
        VALUES ('${id}','${password}','${email}','${fname}','${lname}');`;
        try {
            await this.pool.query(query);
            return 1;
        }
        catch(error){
            return error;
        }
    }

    //need to fix
    async emailExists(email){
            let query=`SELECT COUNT(*) AS email FROM admin WHERE email = '${email}';`
            try {
                let result = await this.pool.query(query);
                result = JSON.parse(JSON.stringify(result[0]));
                if (result[0].email<1){
                    return false
                }else{
                    return true
                }
            }
            catch(error){
                return error;
            }
    }


    async updateById(password,email,fname,lname){
        let query=`UPDATE admin SET password='${password}', email='${email}',fname='${fname}',lname='${lname}' WHERE id='${id}'`;
        try {
            await this.pool.query(query);
            return 1;
        }
        catch(error){
            return error;
        }
    }

    async delById(id){
        let query=`DELETE FROM admin WHERE id='${id}';`;
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