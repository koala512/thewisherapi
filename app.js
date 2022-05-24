require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const sequelize = require('./src/db/sequelize');
// const { Sequelize, DataTypes } = require('sequelize');
// const indexModel = require('./src/models/index');

const app = express();
const PORT = process.env.PORT || 5555;

app
    .use(bodyParser.json())

// const sequelize = new Sequelize('thewisherbdd', 'root', '', {
//     host: 'localhost',
//     dialect: 'mariadb',
//     dialectOptions: {
//       timezone: 'Etc/GMT-2'
//     },
//     logging: false,
//   })



// //test db
// sequelize.authenticate()
//     .then(() => {
//         console.log('Connection has been established successfully.');
//     })
//     .catch(err => {
//         console.error('Unable to connect to the database:', err);
//     });

// const Models= indexModel(sequelize, DataTypes)
  
// sequelize.sync({force: true})
// .then(_ => {console.log('La base de donnée thewisherbdd a bien été initialisée !')})
// .catch(err => {console.error('Unable to connect to the database:', err)})

sequelize.initDb();

const cors = require('cors');
app.use(cors());
// on prévient le serveur que certains requêtes auront un body en JSON
app.use(express.json());
const session = require('express-session');


// Add session 
// app.use( session({
//     secret: "jzeofjjfjijggGDhfghFGDFGqEPG",
//     saveUninitialized: true,
//     resave: true,
//     cookie: {
//         // maxAge in milliseconds.
//         maxAge: 10006060, //1h*
//     secure: false
//     }
// }));

//routes
require('./src/routes/lists/findAllLists')(app);
require('./src/routes/lists/findOneList')(app);
require('./src/routes/lists/createList')(app);


app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
