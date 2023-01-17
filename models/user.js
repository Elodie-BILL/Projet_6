const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');



const userSchema = mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true}, 
    //minlength: 8, maxlength: 10, { validate: function (v){ return v.length < 8}, message : "Le mot de passe doit contenir 8 caractères minimum"}
    
});

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', userSchema);