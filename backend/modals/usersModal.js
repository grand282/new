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
    },
    password: {
        type: String,
        required: [true, 'please add a password']
    },
    email : { type: String, index:true, unique:true,sparse:true},
},
{
    timestamps: true
});

module.exports = mongoose.model('User',userSchema)
