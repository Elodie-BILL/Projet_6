const express = require('express');
const userRoutes = require('./routes/user');
const mongoose = require('mongoose');

const dotenv = require('dotenv');
dotenv.config();
const mongooseUrlConnect =  process.env.DB_URL;


// Connection mongoDB
mongoose.connect( `${mongooseUrlConnect}`, {useNewUrlParser: true,useUnifiedTopology: true})
.then(() => console.log('Connexion à MongoDB réussie !'))
.catch(() => console.log('Connexion à MongoDB échouée !')); 




const app = express();



app.use('/api/auth', userRoutes);

module.exports = app;