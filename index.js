require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const apiRouter = require('./app/router');

const PORT = process.env.PORT || 5555;

app.use(cors());
// on prévient le serveur que certains requêtes auront un body en JSON
app.use(express.json());
app.use('/', apiRouter);

const session = require('express-session');

// Add session 
app.use( session({
    secret: "jzeofjjfjijggGDhfghFGDFGqEPG",
    saveUninitialized: true,
    resave: true,
    cookie: {
        // maxAge in milliseconds.
        maxAge: 10006060, //1h*
    secure: false
    }
}));

app.use('/', apiRouter);

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
