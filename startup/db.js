const winston = require('winston'); 
const mongoose = require('mongoose');
const config = require('config');

module.exports = function() { 
    const db = config.get('db'); 
    
    const discrepancies = {
        useCreateIndex:true, 
        useNewUrlParser: true, 
        useUnifiedTopology: true }

    mongoose.connect( config.get('db'), (discrepancies))
        .then(() => winston.info(`Connected to ${db}..`)); 
    }