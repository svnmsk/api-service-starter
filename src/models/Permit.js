const R = require('ramda');
const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    number: {
        type: String,
        trim: true,
        maxlength: 256,
        unique: true,
        uppercase: true,
    },
    firstName: {
        type: String,
        trim: true,
        maxlength: 256,
    },
    lastName: {
        type: String,
        trim: true,
        maxlength: 256,
    },
    deleted: {
        type: Boolean,
        default: false,
    }
}, {
    timestamps: {
        createdAt: 'createdAt',
        updatedAt: 'updatedAt'
    }
});

module.exports = mongoose.model('Permit', schema);