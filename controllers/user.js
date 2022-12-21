const user = require('../models/user');
const bcrypt = require('bcrypt');

//cryptage du mot de passe
exports.signup = (req, res, next) =>{
    bcrypt.hash(req.body.password, 10)
    .then( hash =>{
        const user= new user({
            email: req.body.email,
            password: hash
        });
        user.save() 
        .then(() => res.status(201).json({ message: 'Compte utilisateur crée'})) /*201 création de ressource*/
        .catch(error => res.status(400).json({ error}));
    })
    .catch(error => res.status(500).json({ error }));
    //erreur 500 = erreur server

};

exports.login = (req,res,next) =>{

};