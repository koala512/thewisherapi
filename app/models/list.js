const sequelize = require ('../database');

const { Model, Sequelize } = require('sequelize');

/**
 * An entity representing a list
 * @typedef List
 * @property {number} id
 * @property {string} title
 * @property {string} coment
 * @property {number} user_id
 */


/**
 * A model representing a wishlist list
 * @class
 */
class List {

    /**
     * The List constructor
     * @param {Object} data - a litteral object with properties that will be copied into the instance
     */
    constructor(data = {}) {
        for (const prop in data) {
            this[prop] = data[prop];
        }
    }

    /**
     * Fetches all list in the database
     * @returns {Array<List>}
     * @async
     * @static
     */
    static async findAll(userId) {
        

        const {rows} = await sequelize.query('SELECT * FROM "list" Where "user_id"=$1 ;',[userId]);
       
        return rows.map(row => new this(row));

    }

    /**
      * Fetches a single list from the database 
     * @param {Number} id       * @returns {List|null} null if there is no list in the database with this id
     * @async
     * @static
     */
     static async findOne(id) {
         const { rows } = await sequelize.query('SELECT * FROM list WHERE id=$1 ;', [id]);

         if (rows[0]) {
             return new List(rows[0]); 
         } else {
             return null;
         }
    }
  

    // Route : /lists to create a lis and /lists/:listId(\\d+) to update a list
    async save() {
        //console.log(this, "avant de passer dans le code de model list");
        if (this.id ) {       
            try{
              // UPDATE
                 await db.query('SELECT * FROM update_list($1);', [this]);   
            }catch(err){
                throw new Error(err.detail);
            }
        } else {
            try {
            // INSERT
                const { rows } = await db.query('SELECT * FROM new_list($1);', [this]);
                this.id = rows[0].id;
                // console.log(this, "this dans models"); 
            } catch (err) {
                throw new Error(err.detail);
             }
        }
    }
    // Route : /list/delete/:listId(\\d+)
    async delete(){
        if(this.id){
            try { 
                 await db.query('DELETE FROM list WHERE id = $1 AND "user_id"=$1',[this.id])
               

            } catch (err) {
                throw new Error(err.detail);
            }
        }
    }

 }

 List.init({
    title: Sequelize.STRING,
    comment: Sequelize.STRING,
    user_id: Sequelize.STRING 
    }, {
        sequelize,
        tableName: 'list'
    }
);

module.exports = List;  