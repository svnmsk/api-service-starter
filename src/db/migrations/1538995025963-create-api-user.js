const Model = require('../../models/User');
const mongoose = require('mongoose');
const bcrypt =require('bcrypt');
mongoose.Promise = Promise;

let user = {
    login: 'user',
    password: '123456',
};

const createHash = (password) => new Promise((resolve, reject) => {
    bcrypt.genSalt(10, (err, salt) => {
        if (err) return reject(err);
        bcrypt.hash(password, salt, (hashErr, hash) => {
            return hashErr ? reject(hashErr) : resolve(hash);
        });
    });
});

export async function up () {
    user.password = await createHash(user.password);
    await this('User', Model.schema).create(user);
}

export async function down () {
    await this('User', Model.schema).deleteOne({login: user.login});
}
