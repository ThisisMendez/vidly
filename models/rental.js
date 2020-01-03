const Joi = require('joi'); 
const mongoose = require('mongoose')

const Rental = mongoose.model('Rental', new mongoose.Schema ({ 
        // this is the customer property it is set to type of new mongoose.Schema that is define here. Not reusing the customer schema that was used in the customers module. 
        // WHY. because the customer can have 50 props. and we don't want to have all props in this object. Only the essential

        customer: {
        type: new mongoose.Schema ({ 
            name: { 
                type: String, 
                required: true, 
                minlength: 5, 
                maxlength: 50
            }, 
            isGold: { 
                type: Boolean, 
                default: false
            }, 
            phone: {
                type: String, 
                required: true,
                minlength: 5, 
                maxlength: 50
            }
        }), 
        required: true
    }, 
    movie: { 
        type: new mongoose.Schema({ 
            title: { 
                type: String, 
                required: true, 
                trim: true, 
                minlength: 5, 
                maxlength: 255
            }, 
            dailyRentalRate: { 
                type: Number, 
                required: true, 
                min: 0, 
                max: 255
            }
        }), 
        required: true
    }, 
        dateOut: { 
            type: Date, 
            required: true, 
            default: Date.now
        }, 
        dateReturned: { 
            type: Date
        }, 
        rentalFee: { 
            type: Number, 
            min: 0 
        }
    })); 

    function validateRental(rental) { 
        const schema = { 
            customerId: Joi.objectId().required(), 
            movieId: Joi.objectId().required()
        }; 

        return Joi.validate(rental, schema); 
    }

    exports.Rental = Rental; 
    exports.validate = validateRental; 

    