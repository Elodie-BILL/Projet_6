const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv').config();
// const path = require("path");
const userRoutes = require('./routes/user');
const sauceRoutes = require('./routes/sauce');

const app = express();

mongoose.set('strictQuery', true); //garantit que les valeurs transmises à notre constructeur de modèle qui n'ont pas été spécifiées dans notre schéma ne sont pas enregistrées dans la base de données.
// const mongooseUrlConnect =  process.env.DB_URL;
// Connection mongoDB
// mongoose.connect( `${mongooseUrlConnect}`, {useNewUrlParser: true, useUnifiedTopology: true})
mongoose.connect( process.env.DB_URL, {useNewUrlParser: true, useUnifiedTopology: true})
.then(() => console.log('Connexion à MongoDB réussie !'))
.catch(() => console.log('Connexion à MongoDB échouée !')); 


app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api/auth', userRoutes);
app.use('/api/sauces', sauceRoutes);



module.exports = app;