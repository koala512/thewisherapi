const { Sequelize, DataTypes } = require('sequelize')
const indexModel = require('../models/index');
  
const sequelize = new Sequelize('thewisherbdd', 'root', '', {
  host: 'localhost',
  dialect: 'mariadb',
  dialectOptions: {
    timezone: 'Etc/GMT-2',
  },
  logging: false
})
  
const Models= indexModel(sequelize, DataTypes)
  
const initDb = () => {
  return sequelize.sync({force: true}).then(_ => {console.log('La base de donnée a bien été initialisée !')})
}
  
module.exports = { 
  initDb, Models
}