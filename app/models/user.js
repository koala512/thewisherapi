'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
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
  }
    static associate(models) {
      // define association here
    }
  }
  User.init({
    pseudo: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};