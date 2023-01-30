const express = require('express');
const router = express.Router();


//Import logique métier
const userCtrl = require('../controllers/User');

//Routage
router.post('/signup', userCtrl.signup);
router.post('/login', userCtrl.login);

module.exports= router;

