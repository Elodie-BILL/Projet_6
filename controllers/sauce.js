const Sauce = require('../models/sauce');
const fs = require('fs');
// const sauce = require('../models/sauce');
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

  console.log(sauce);
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
  const userId = req.auth.userId;
  const likes = req.body.like;

  Sauce.findOne({_id: req.params.id}) 
  .then((sauce)=> {
    // console.log('dans le then');
    // console.log(sauce);

   
     console.log(userId);
      switch (likes) {
        case 1:

          sauce.usersLiked.push(userId);   
          sauce.likes++; 

        break;

        case -1:

          sauce.usersDisliked.push(userId);
          sauce.dislikes++;

        break;
      
        case 0 :
          if(sauce.usersLiked.includes(userId)){

            const indexLikes = sauce.usersLiked.indexOf(userId);
            sauce.usersLiked.splice(indexLikes, 1);
            sauce.likes--;

          } else {

            const indexDislikes = sauce.usersDisliked.indexOf(userId);
            sauce.usersDisliked.splice(indexDislikes, 1);
            sauce.dislikes--;

          }
        break;
              
      };
      
      Sauce.updateOne({ _id: req.params.id} , sauce )
        .then(() => res.status(200).json({ message: 'Avis reçu' }))
        .catch(error => res.status(500).json({ error }))  
    // };
    
  })  
  .catch( error => {
    res.status(500).json({error});
  }); 
};