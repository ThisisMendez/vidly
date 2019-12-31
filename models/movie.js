const Joi = require('joi'); 
const mongoose = require('mongoose'); 
const {genreSchema} = require('./genre'); 

const Movie = mongoose.model('Movies', new mongoose.Schema ({ 
    title: {
        type: String, 
        required: true, 
        trim: true, // get rid of any paddings in the title of the movie
        minlength: 5, 
        maxlength: 255
    }, 
    genre: { 
        type: genreSchema, 
        required: true
    }, 
    numberInStock: { 
        type: Number, 
        required: true
    }
}))