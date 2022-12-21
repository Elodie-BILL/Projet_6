const express = require('express');
const mongoose = require('mongoose');
const app = express();
const dotenv = require('dotenv');
const dotenvResult = dotenv.config();

const mongooseUrlConnect =  process.env.DB_URL;
mongoose.connect( `${mongooseUrlConnect}`,
{useNewUrlParser: true,
    useUnifiedTopology: true})
.then(() => console.log('Connexion à MongoDB réussie !'))
.catch(() => console.log('Connexion à MongoDB échouée !')); 
console.log(process.env.MONGOOSE_URL);





module.exports = app;