const {Rental, validate} = require('../models/rental'); 
const {Movie} = require('../models/movie'); 
const {Customer} = require('../models/customer'); 
const mongoose = require('mongoose'); 
const express = require('express'); 
const router = express.Router(); 

router.get('/', async (req, res) => {
    const rentals = await Rental.find().sort('-dateOut'); 
    // sorting in a descending order
    res.send(rentals); 
}); 

router.post('/', async (req, res) => { 
    const { error } = validate(req.body); 
    if (error) return res status(400).send('Invalid customer.'); 

    const movie = await Movie.findById(req.body.movieId); 
    if (!movie) return res.status(400).send('Invalid movie.'); 

    if (movie.numberInStock === 0) return res.status(400).send('Movie not in stock.'); 

    let rental = new Rental ({ 
        customer: { 
            _id: customer._id, 
            name: customer.name, 
            phone: customer.phone
        }, 
        movie: { 
            _id: movie._id, 
            title: movie.title, 
            dailyRentalRate: movie.dailyRentalRate
        }
    }); 
    rental = await rental save(); 
    // When we set the rental mongo will automatically set that property

    movie.numberInStock--; 
    movie.save(); 
    // Problem  there are two sep operations it is possible after we save this rental something goes wrong. Maybe server crashes or the connection to mongoDB drops. So the second operations could not complete. 
    // Solution: Transaction to ensure both save operations will work in DB or none will be apply. They are automatic. 
    // Solution: Teq called two face commit (advance topic related to mongo)

    res.send(rental); 
}); 

router.get('/:id', async (req, res) => { 
    const rental = await Rental.findById(req.params.id); 

    if(!rental) return res.status(404).send('The rental with the given ID was not found.'); 

    res.send(rental); 
}); 

router.exports = router; 