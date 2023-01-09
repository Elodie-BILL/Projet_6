const Sauce = require('../models/sauce');
const fs = require('fs');
const sauce = require('../models/sauce');
// const sauce = require('../models/sauce');
// const { Console } = require('console');


exports.createSauce = (req, res) => {
  const sauceObject = JSON.parse(req.body.sauce);
  console.log(sauceObject);

  delete sauceObject._id;
  delete sauceObject._userId;

  // récupération du token
  const sauce = new Sauce({
    ...sauceObject,
    userId: req.auth.userId,
    imageUrl:`${req.protocol}://${req.get('host')}/images/${req.file.filename}`
  });

  sauce.save()
  .then(() => (res.status(201).json({message: 'Sauce enregistrée'})))
  .catch(error => { res.status(400).json({error})});
 
}

exports.getOneSauce = (req, res) => {
    Sauce.findOne({
      _id: req.params.id
    })
    .then(Sauce => {
      res.status(200).json(Sauce)
    })
    .catch((error) =>{
      res.status(404).json({ error: error});
    });
    
};

exports.modifySauce = (req, res) => {
  // Vérification existance champs 'file'
  const sauceObject = req.file ? {
    ... JSON.parse(req.body.sauce),
    imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
  }: {...req.body};  

  delete sauceObject._userId;

  Sauce.findOne({_id: req.params.id}) //Récupértion sauce en base de donnée
    .then((sauce) => {
      if (sauce.userId != req.auth.userId){
        return res.status(401).json({ message: 'Action non autorisé'});
      } 
      
      const previousSauceFilename = sauce.imageUrl.split('/images/')[1];
      Sauce.updateOne({_id: req.params.id}, {...sauceObject, _id: req.params.id})
      .then(() => {
        fs.unlink(`images/${previousSauceFilename}`, (err) => {
          if (err) throw err;
        });
        res.status(200).json({ message: 'Sauce modifiée' })
      })
      .catch(error => res.status(401).json({error}));
      

    })    
    .catch((error) =>{
      res.status(400).json({error})
    });  
    
};    
 
  
exports.deleteSauce = (req, res) => {
  Sauce.findOne({_id: req.params.id})
    .then(sauce => {
      if (sauce.userId != req.auth.userId){
        return res.status(401).json({ message: 'Action non autorisé'});
      } 

      const filename = sauce.imageUrl.split('/images/')[1];
      fs.unlink(`images/${filename}`, () => {
        Sauce.deleteOne({ _id: req.params.id})
          .then(()=> 
            res.status(200).json({message: 'sauce supprimée'})
          )
          .catch(error => 
            res.status(401).json({ error})
          );
      });
      
    })
    .catch( error => {
      res.status(500).json({error});
    });    
   
};
  
exports.getAllSauce = (req, res) => {
  Sauce.find()
    .then((sauce) => {
      res.status(200).json(sauce);
    })
    .catch((error) => {
      res.status(400).json({
        error: error
      });
    });
};

exports.likesSauce = (req, res) =>{
  const userId = req.body.userId;
  const likes = req.body.likes;

  Sauce.findOne({_id: req.params.id}) 
  .then((sauce)=> {
    console.log('dans le then');
    // if (sauce.userId != req.auth.userId){
      
    //   return res.status(401).json({ message: 'Veuillez-vous connecter'})
    // }; 
    const dataValues = {
      userLikes : sauce.usersLiked,
      userDislikes : sauce.usersDisliked,
      likes : 0,
      dislikes : 0
    }

    console.log(dataValues);

    // if(req.auth.userId){
     console.log(userId);
      switch (like) {
        case likes: //+1

          dataValues.userLikes.push(userId);   

        break;

        case dislikes: // -1

          dataValues.userDislikes.push(userId);

        break;
      
        case neutre: // 0
          if(dataValues.userLikes.includes(userId)){

            const indexLikes = dataValues.userLikes.indexOf(userId);
            dataValues.userLikes.splice(indexLikes, 1);

          } else {

            const indexDislikes = dataValues.userDislikes.indexOf(userId);
            dataValues.userDislikes.splice(indexDislikes, 1);
          
          }
        break;
              
      };

      dataValues.likes = dataValues.userLikes.length;
      dataValues.dislikes = dataValues.userDislikes.length;
      
      Sauce.updateOne({ _id: req.params.id} , dataValues )
        .then(() => res.status(200).json({ message: 'Avis reçu' }))
        .catch(error => res.status(500).json({ error }))  
    // };
    console.log(dataValues);
  })  
  .catch( error => {
    res.status(500).json({error});
  }); 
};