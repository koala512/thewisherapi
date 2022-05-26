require('dotenv').config();
const { sequelize, User, List, Item } = require('./models')
const express = require('express');
const bodyParser = require('body-parser')
const app = express();
const cors = require('cors');

//define port
const PORT = process.env.PORT || 5000;


app.use(bodyParser.json());
// use cors to allow cross origin resource sharing
app.use(cors());
// on prévient le serveur que certains requêtes auront un body en JSON
app.use(express.json());

app.get('/', (req, res) => {
  res.json('hello heroku')
})

//user routes
require('./src/routes/user/createUser')(app)
require('./src/routes/user/login')(app)
require('./src/routes/user/updateUser')(app)
require('./src/routes/user/deleteUser')(app)
//list routes
require('./src/routes/list/createList')(app)
require('./src/routes/list/getAllList')(app)
require('./src/routes/list/getOneList')(app)
require('./src/routes/list/updateList')(app)
require('./src/routes/list/deleteList')(app)
//item routes
require('./src/routes/item/createItem')(app)
require('./src/routes/item/updateItem')(app)
require('./src/routes/item/deleteItem')(app)

app.listen( PORT , async () => {
    console.log(`Server up on http://localhost:${PORT}`)
    await sequelize.authenticate()
    console.log('Database Connected!')
  }) 