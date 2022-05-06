require('dotenv').config();
const { Sequelize } = require('sequelize');
const sequelize = new Sequelize(process.env.PG_URL, {
    dialect: 'postgres',
});
     
const { Client } = require('pg');
const db = new Client({connectionString: process.env.DATABASE_URL,
    ssl: {rejectUnauthorized: false} });
db.connect()  


module.exports = sequelize;