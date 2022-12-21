const express = require('express');
const router = express.Router();

const userCtrl = require('../controllers/user');

router.post('/signup', userCtrl.signup);
router.post('/login', userCtrl.login);

module.exports= router;

//router.post('/',(req,res,next)=>{
//     const thing = new thing({

//     });
//     thing.save().then(
//         ()=>{
//             res.status(201).json({
//                 message: 'Publié avec succès'
//             });
//         }
//     )
//     .catch(
//         (error)=>{
//             res.status(400).json({
//                 error:error
//             });
//         }
//     );
// });
