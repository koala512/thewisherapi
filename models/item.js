'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Item extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({List}) {
      // define association here
      this.belongsTo(List, { foreignKey: 'listId' });
    }
  }
  Item.init({
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    url: {
      type: DataTypes.STRING(1234),
      allowNull: true,
    },
    image: {
      type: DataTypes.STRING(1234),
      allowNull: true,
    },
    comment: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  }, {
    sequelize,
    tableName: 'items',
    modelName: 'Item',
  });
  return Item;
};