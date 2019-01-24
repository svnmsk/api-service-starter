const config = require('../config');
const port = config.server.port;
const logger = require('./utils/logger');

module.exports = (app) => {
    return app.listen(port, (err) => {
        if (err) return console.error('something bad happened', err);
        logger.info(`Server is listening on ${port}`);
    });
};