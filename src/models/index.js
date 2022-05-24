const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  
  const user= sequelize.define('User', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    pseudo: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    }}, {
      timestamps: true,
      createdAt: true,
      updatedAt: true
    });

    const list = sequelize.define('List', {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER
          },
          title: {
            type: DataTypes.STRING,
            allowNull: false,
          },
          comment: {
            type: DataTypes.STRING,
            allowNull: true,
            unique: true
          },
        }, {
          timestamps: true,
          createdAt: true,
          updatedAt: true
        });

    const item = sequelize.define('Item', {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER
          },
          title: {
            type: DataTypes.STRING,
            allowNull: false,
          },
          url: {
            type: DataTypes.STRING,
            allowNull: true,
          },
          coment: {
            type: DataTypes.STRING,
            allowNull: true,
          },
        },
        {
            timestamps: true,
            createdAt: true,
            updatedAt: true
        });

        //ASSOCIATIONS
        user.hasMany(list, { foreignKey: 'user_id', OnDelete: 'CASCADE' })
        list.belongsTo(user)
        list.hasMany(item, { foreignKey: 'list_id', OnDelete: 'CASCADE' })
        item.belongsTo(list)
  };


