const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'please add a name']
    },
    phone: {
        type: Number,
        required: [true, 'please add phone number'],
        unique: true,
        sparse:true
    },
    password: {
        type: String,
        required: [true, 'please add a password']
    },
},
{
    timestamps: true
});

module.exports = mongoose.model('User',userSchema)