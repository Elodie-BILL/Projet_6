const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

//cryptage du mot de passe
exports.signup = (req, res, next) =>{
    bcrypt.hash(req.body.password, 10)
    .then( hash =>{
        const user = new User({
            email: req.body.email,
            password: hash
        });
        user.save() 
        .then(() => res.status(201).json({ message: 'Compte utilisateur crée'})) /*201 création de ressource*/
        .catch(error => res.status(400).json({ error }));
    })
    .catch(error => res.status(500).json({ error }));
    //erreur 500 = erreur server

};

exports.login = (req,res,next) =>{
    user.findOne({email: req.body.email })
    .then(
        //vérifiactions si utilisateur retrouver dans base de donnée
    user => {
        if(user === null){
            res.status(401).json({message : 'Identifiant / mot de passe incorrecte'});

        }else{
            bcrypt.compare(req.body.password, User.password)
            .then(valid=> {
                if(!valid){
                    res.status(401).json({message: 'Identifiant/mot de passe incorrecte'})
                } else {
                    res.statut(200).json({
                        userId: user._id,
                        token: jwt.sign(
                            { userId : user._id},
                            'RANDOM_TOKEN_SECRET_951753_TO_PPROTECT348618_DB9_',
                            {expiresIn: '24h'}
                        )
                        
                    });
                }

            })
            .catch(error => {
                res.statut(500).json({error});

            })
        }
    })
    .catch(error => {
        res.status(500).json({error});
    });

};