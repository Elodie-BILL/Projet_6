const Thing = require('../models/Thing');

exports.createThing = (req, res, next) => {
    delete req.body._id;
    const thing = new Thing({
        ...req.body
    });
    thing.save()
    .then(()=> res.status(201).json({message: 'Sauce ajoutée'}))
    .catch (error => res.satus(400).json({ error }));
 
}

exports.getOneThing = (req, res, next) => {
    thing.findOne({
        _id: req.params.id
    })
    .then((thing) => {res.status(200).json(thing)})
    .catch((error) =>{
        res.status(404).json({ error: error});
    });
    
};

// exports.modifyThing = (req, res, next) => {
//     const thing = new Thing({
//       _id: req.params.id,
//       title: req.body.title,
//       description: req.body.description,
//       imageUrl: req.body.imageUrl,
//       price: req.body.price,
//       userId: req.body.userId
//     });
//     Thing.updateOne({_id: req.params.id}, Thing).then(
//       () => {
//         res.status(201).json({
//           message: 'Commentaire modifié!'
//         });
//       }
//     ).catch(
//       (error) => {
//         res.status(400).json({
//           error: error
//         });
//       }
//     );
//   };
  
//   exports.deleteThing = (req, res, next) => {
//     Thing.deleteOne({_id: req.params.id}).then(
//       () => {
//         res.status(200).json({
//           message: 'Supprimé'
//         });
//       }
//     ).catch(
//       (error) => {
//         res.status(400).json({
//           error: error
//         });
//       }
//     );
//   };
  
//   exports.getAllStuff = (req, res, next) => {
//     Thing.find().then(
//       (things) => {
//         res.status(200).json(Things);
//       }
//     ).catch(
//       (error) => {
//         res.status(400).json({
//           error: error
//         });
//       }
//     );
//   };
