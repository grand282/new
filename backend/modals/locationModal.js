const mongoose = require('mongoose');

const locationSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    province: {
        type: String,
        required: [true, 'please add a province value']
    },
    townOrCity: {
        type: String,
        required: [true, 'please add a town/city value']
    },
    constituency: {
        type: String,
    },
    street: {
        type: String
    },
    bedroomNumber: {
        type: Number,
        required: [true, 'please add value']
    },
    
},{
    timestamps: true,
}
)

module.exports = mongoose.model('Location', locationSchema)