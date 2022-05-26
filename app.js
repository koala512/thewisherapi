require('dotenv').config();
const { sequelize, User, List, Item } = require('./models')
const express = require('express');
const bodyParser = require('body-parser')
const app = express();
const cors = require('cors');

const PORT = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(cors());
// on prévient le serveur que certains requêtes auront un body en JSON
app.use(express.json());

require('./src/routes/createUser')(app)
require('./src/routes/login')(app)
require('./src/routes/createList')(app)


app.listen( PORT , async () => {
    console.log(`Server up on http://localhost:${PORT}`)
    await sequelize.authenticate()
    console.log('Database Connected!')
  }) 