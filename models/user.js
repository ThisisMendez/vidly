const config = require('config'); 
const jwt = require('jsonwebtoken')
const Joi = require('joi');
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({ 
    name:{
        type: String, 
        required: true, 
        minlength: 5, 
        maxlength: 50
  }, 
    email: {
        type: String, 
        required: true, 
        minlength: 5, 
        maxlength: 255, 
        unique: true
    }, 
    password: {
        type: String, 
        required: true, 
        minlength: 5, 
        maxlength: 1024
    }, 
    isAdmin: Boolean
}); 

userSchema.methods.generateAuthToken = function() { 
  const token =jwt.sign({ _id: this._id, isAdmin: this.isAdmin }, config.get('jwtPrivateKey'));
  return token; 
// can not replace syntax with an arrow function because arrow function does not have there own this. If you want to create a method inside of a object you should not use an arrow function 
}

const User = mongoose.model('User', userSchema );

// Why do you move Schema object

function validateUser(user) {
  const schema = {
    name: Joi.string().min(5).max(50).required(), 
    email: Joi.string().min(5).max(255).required().email(), 
    password: Joi.string().min(5).max(255).required()
  };
  return Joi.validate(user, schema);
}

exports.User = User; 
exports.validate = validateUser; 
