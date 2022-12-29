const express = require('express');
const app = express();
app.use(express.json());

const dotenv = require('dotenv');
dotenv.config();

const mongoose = require('mongoose');
const mongooseUrlConnect =  process.env.DB_URL;

// Connection mongoDB
mongoose.connect( `${mongooseUrlConnect}`, {useNewUrlParser: true,useUnifiedTopology: true})
.then(() => console.log('Connexion à MongoDB réussie !'))
.catch(() => console.log('Connexion à MongoDB échouée !')); 

const sauceRoutes = require('./routes/sauce');
const userRoutes = require('./routes/User');

app.use('/api/auth', userRoutes);
app.use('/api/sauces', sauceRoutes);

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

module.exports = app;