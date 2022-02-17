let userData = require("../data/users.json");
const sql = require("../postgres");

class User{
    constructor(data){
        this.username = data.username;
        this.password = data.password;
    }

    static get all(){
        return new Promise( async (resolve, reject) => {
            try{
                const userData = await sql`SELECT * FROM users`;
                const users = userData.map(user => new User(user));
                resolve(users);
            }catch (err){
                reject(err);
            }
        });
    }

    static byUsername(username){
        return new Promise( async (resolve, reject) => {
            try{
                const userData = await sql`SELECT * FROM users WHERE username=${username}`;
                if(!userData.length) throw new Error("username doesn't exist");
                const user = new User(userData[0]);
                resolve(user);
            }catch (err){
                reject(err);
            }
        });
    }

    static createNew({ username, password }){
        return new Promise( async (resolve, reject) => {
            try{
                const userData = await sql`
                    INSERT INTO users (username, password) 
                    VALUES (${username}, ${password}) 
                    ON CONFLICT DO NOTHING RETURNING *
                `;
                if(!userData.length) reject("username taken");
                resolve(userData[0]);
            } catch (err) {
                reject(err);
            }
        });
    }

    get greeting(){
        return `hello ${this.username}`;
    }
}

module.exports = User;
