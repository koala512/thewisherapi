const { Model } = require('sequelize');

  module.exports = (sequelize, DataTypes) => {
    class Item extends Model {

        static async findAll() {
            const query = `SELECT * FROM item`;
    
            const {rows} = await db.query(query);
    
            return rows.map(row => new this(row));
        }
    
        /**
         * Fetches an item by his id
         * @param {*} id 
         */
        static async findOne(id) {
           
            const { rows } = await db.query('SELECT * FROM item WHERE id=$1 ;', [id]);
    
            if (rows[0]) { 
                return new Item(rows[0]);
            } else {
                return null;
            }
        }
    
        /**
         * Fecthes all items with the same list_id
         * @param {*} id 
         */
        static async findAllByListId(id) {
    
           
            const { rows } = await db.query('SELECT * FROM item WHERE "list_id"=$1;', [id]);
    
            if (rows) {
            
                let returnArray = [];
            
                rows.map((row) => {
                    returnArray.push(new Item(row))
                })
                return returnArray; 
            }
    
                return null;
        }
     
         //Update an item if his id is find in the database else create an item.
         
        async save() {
    
            console.log(this, "this inside model before code");
            if (this.id) {
            // UPDATE
            
                await db.query('SELECT * FROM update_item($1);', [this]);
                
            } else {
             try {
                // INSERT
                const { rows } = await db.query('SELECT * FROM new_item($1);', [this]);
                this.id = rows[0].id;
                //console.log(this, 'this inside item model');
                } catch (err) {
                throw new Error(err.detail);
                 }
            }
        }
    
        //Delete an item from the database 
        async delete(){
            if(this.id){
                try { 
                    await db.query('DELETE FROM item WHERE id = $1',[this.id])
                    
                } catch (err) {
                    throw new Error(err.detail);
                }
            }
        }
    }
    Item.init({
        title:  DataTypes.STRING,
        url: DataTypes.STRING,
        coment: DataTypes.STRING,
      }, {
        sequelize,
        modelName: 'Item',
      });
      return Item;
}