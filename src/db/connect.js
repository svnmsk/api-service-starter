const mongoose = require('mongoose');
const logger = require('../utils/logger');

function dbConnect(config) {
    return new Promise((resolve, reject) => {
        mongoose.connect(config.uri, config.options);
        mongoose.connection
            .on('error', error => reject(error))
            .on('close', () => logger.info('Database connection closed.'))
            .once('open', () => {
                const conn = mongoose.connection;
                logger.info(`Connected to ${conn.host}:${conn.port}/${conn.name} database.`);
                resolve(conn);
            });
    });
}

module.exports = dbConnect;