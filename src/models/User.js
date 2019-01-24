const mongoose = require('mongoose');
const bcrypt =require('bcrypt');

const schema = new mongoose.Schema({
    login: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        trim: true,
        required: true,
    },
}, {
    timestamps: {
        createdAt: 'createdAt',
        updatedAt: 'updatedAt'
    }
});

schema.pre('save', function (next) {
    const user = this;
    if (!user.isModified('password')) {
        return next();
    }

    bcrypt.genSalt(10, (err, salt) => {
        if (err) return next(err);

        bcrypt.hash(user.password, salt, (hashErr, hash) => {
            if (hashErr) return next(hashErr);

            user.password = hash;
            next();
        });
    });
});

schema.methods.comparePassword = function (toCompare, done) {
    bcrypt.compare(toCompare, this.password, (err, isMatch) => {
        if (err) done(err);
        else done(err, isMatch);
    });
};

module.exports = mongoose.model('User', schema);