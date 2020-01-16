const jwt = require('jsonwebtoken'); 
const config = require('config'); 

module.exports = function (req, res, next) { 
    const token = req.header('x-auth-token');
    if (!token)  return res.status(401).send('Access denied. No token provided.');
        // To let the client know why they cant get to the resource 

    try{ 
        const decoded = jwt.verify(token, config.get('jwtPrivateKey')); 
        //this verify method will verify the token. If it's valid we will go to the payload 
        req.user = decoded; 
        next();
    }
    catch (ex) { 
        res.status(400).send('Invalid token'); 
        // If the token is wrong
    }
}

// module.exports = auth; 
    // Line 4 is the shortcut 