const jwt = require('jsonwebtoken');
const dotenv = require('dotenv').config();

module.exports = (req,res, next) =>{
    try{
        //récupération token: divison chaine de caractère en tableau entre mot clef bearer et token
        const token = req.headers.authorization.split(' ')[1];
        //Méthode vérification de jwt
        const decodedToken = jwt.verify(token, process.env.secretKeyToken);
        //Récupération propiété userId dans le token et transmission à auth
        const userId = decodedToken.userId;
        req.auth = {
            userId: userId
        };
        next()
    }
    catch(error) {
        console.log(error);
        res.status(401).json({error});

    };
};
