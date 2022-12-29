const express = require('express');
const app = express();
app.use(express.json());

const dotenv = require('dotenv');
dotenv.config();

const mongoose = require('mongoose');
mongoose.set('strictQuery', false); // true: garantit que les valeurs transmises à notre constructeur de modèle qui n'ont pas été spécifiées dans notre schéma ne sont pas enregistrées dans la base de données.
const mongooseUrlConnect =  process.env.DB_URL;

// Connection mongoDB
mongoose.connect( `${mongooseUrlConnect}`, {useNewUrlParser: true, useUnifiedTopology: true})
.then(() => console.log('Connexion à MongoDB réussie !'))
.catch(() => console.log('Connexion à MongoDB échouée !')); 

const sauceRoutes = require('./routes/sauce');
const userRoutes = require('./routes/user');

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

app.use('/api/auth', userRoutes);
app.use('/api/sauces', sauceRoutes);



module.exports = app;