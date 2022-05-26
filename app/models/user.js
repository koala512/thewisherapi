const db = require('../database');
const client = require('../database');
const bcrypt = require("bcrypt")


/**
 * An entity representing of user
 * @typedef User
 * @property {number} id
 * @property {string} pseudo
 * @property {string} email
 * @property {string} password
 */

   /**
 * A model representing a wishlist list
 * @class
 */
class User {

    /**
     * The User constructor
     * @param {Object} data - a litteral object with properties that will be copied into the instance
     */
    constructor(data = {}) {
        for (const prop in data) {
            this[prop] = data[prop];
        }
    }

    static async findOne (email) {

        const {rows}= await db.query('SELECT * FROM "user" WHERE email = $1; ',
        [email]);

        if (rows[0]) {
                return new User(rows[0]);
        }else{
            return null ; 
        }

    }

    async save() {
       
       
        const hash = bcrypt.hashSync(this.password, 10);

        this.password = hash;
                const user = await db.query('SELECT * FROM new_user($1);', [this]);
               return user.rows[0]

       /* await bcrypt.hash(this.password, 10,async function (err,hash) {
            if (err) {
                console.log('Error hashing password for user', user.email);
            }else{
                _this.password = hash;
                const user = await db.query('SELECT * FROM new_user($1);', [_this]);
               createdUser = user.rows[0]
            }
        })

        return createdUser;*/
    }
   

}

module.exports = User;