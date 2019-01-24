const compose = require('compose-middleware');
const bodyParser = require('body-parser');
const compression = require('compression');
const qs = require('express-qs-parser');
const helmet = require('helmet');
const morgan = require('morgan');
const cors = require('cors');
const corsConfig = require('./corsConfig');
const config = require('../../config');
const express = require('express');

module.exports = (app) => {

    if (config.env !== 'production') {
        app.use(express.static('./public'));
    }

    return compose.compose([
        compression(),
        helmet(),
        morgan(':method :url :status :res[content-length] bytes - :response-time ms'),
        bodyParser.json({ limit: '50mb' }),
        bodyParser.urlencoded({ extended: false, limit: '50mb' }),
        cors(corsConfig),
        qs({})
    ]);
};