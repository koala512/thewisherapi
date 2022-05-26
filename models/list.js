'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class List extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({Item, User}) {
      // define association here
      this.hasMany(Item, { foreignKey: 'listId', as: 'items' }),
      this.belongsTo(User, { foreignKey: 'userId', as: 'users' });
    }
  }
  List.init({
    title: {
      type: DataTypes.STRING, 
      allowNull: false
    },
    comment: DataTypes.STRING
  }, {
    sequelize,
    tableName: 'lists',
    modelName: 'List',
  });
  return List;
};