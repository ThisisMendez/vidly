const jwt = require('jsonwebtoken'); 
const config = require('config');
const bcrypt = require('bcrypt');
const _ = require('lodash');
const {User, validate} = require('../models/user'); // To validate a new User
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();


//POST
router.post('/', async (req, res) => {
    const { error } = validate(req.body)
    if (error) return res.status(400).send(error.details[0].message);
    
    let user = await User.findOne({ email: req.body.email}); 
    if (user) return res.status(400).send('User already registered.');

    user = new User (_.pick(req.body, ['name', 'email', 'password'])); 
        const salt = await bcrypt.genSalt(10)
        user.password = await bcrypt.hash(user.password, salt);
        await user.save();

const token = user.generateAuthToken(); 
res.header('x-auth-token', token).send(_.pick(user, ['_id', 'name', 'email']));
});

module.exports = router; 

// The argument we set the number of rounds you want to generate the salt 
// The salt and hashed are included both because later when you want to authenticate the user you want to validate the username and password
