const express = require('express');
const router = express.Router();

const AuthController = require('../controllers/AuthController');
const PermitController = require('../controllers/PermitController');

module.exports = (app) => {
    router
        .get('/', PermitController.list)
        .get('/search-one', PermitController.searchOne)
        .get('/:id', PermitController.single)
        .post('/', PermitController.create)
        .patch('/:id', PermitController.update)
    ;

    app.use('/permit', router);
};