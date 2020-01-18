const winston = require('winston'); 

module.exports = function(err, req, res, next){
    winston.error(err.message, err);
    res.status(500).send('Something failed.'); 
} 
    // These errors are only catching errors that take part of request processing pipeline. Particular to express 
    
    // Logging Levels 
        // error - most important 
        // warn 
        // info - strong information (not errors)
        // verbose 
        // debug 
        // silly 