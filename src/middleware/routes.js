const ApplicationError = require('../errors/ApplicationError');
const requireall = require('require-all');
const path = require('path');
const logger = require('../utils/logger');

module.exports = (app) => {

    // app.use((req, res, next) => {
    //     if (!req.xhr) return res.status(400).send('Bad Request ');
    //     next();
    // });

    requireall({
        dirname: path.resolve(__dirname, '../routes'),
        excludeDirs:   /^__+.+__$/,
        resolve: (route) => route(app)
    });

    app.use((req, res, next) => {
        if (process.env.NODE_ENV === 'production') {
            let error = new ApplicationError('Not Found', {status: 404});
            error.status = 404;
            return next(error);
        }
        next();
    });

    app.use((error, req, res, next) => {
        const status = error.status || 500;
        logger.error(error.message, error);
        return res
            .status(status)
            .send({
                success: false,
                message: error.message,
            });
    });
};