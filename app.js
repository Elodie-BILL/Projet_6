const express = require('express');
app = express();

// const stuffRoutes = require('./routes/stuff');
const userRoutes = require('./routes/User');

const dotenv = require('dotenv');
dotenv.config();

const mongoose = require('mongoose');
const mongooseUrlConnect =  process.env.DB_URL;

// Connection mongoDB
mongoose.connect( `${mongooseUrlConnect}`, {useNewUrlParser: true,useUnifiedTopology: true})
.then(() => console.log('Connexion à MongoDB réussie !'))
.catch(() => console.log('Connexion à MongoDB échouée !')); 



app.use(express.json());
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

// app.use('/api/stuff', stuffRoutes);
app.use('/api/auth', userRoutes);


module.exports = app;