require('dotenv').config();
const { Sequelize } = require('sequelize');
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
     
const { Client } = require('pg');
const db = new Client({connectionString: process.env.DATABASE_URL,
    ssl: {rejectUnauthorized: false} });
db.connect()  


module.exports = db;