const mongoose = require('mongoose');

const locationSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    district: {
        type: String,
    },
    ward: {
        type: String,
    },
    description: {
        type: String,
    },
    bathrooms: {
        type: Number,
    },
    bedrooms: {
        type: Number,
    },
    price: {
        type: Number,
    },
    image: [String],
    
},{
    timestamps: true,
}
)

module.exports = mongoose.model('Location', locationSchema)