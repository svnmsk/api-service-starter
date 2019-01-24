const express = require('express');
const router = express.Router();

const AuthController = require('../controllers/AuthController');
const UserController = require('../controllers/UserController');

module.exports = (app) => {
    router
        .post('/login', UserController.login, AuthController.provideToken)
        .post('/register', AuthController.auth, UserController.create)
        .put('/token', AuthController.auth, AuthController.provideToken)
    ;

    app.use('/user', router);
};