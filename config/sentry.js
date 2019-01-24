require('dotenv').config();

module.exports = {
    dsn: process.env.SENTRY_DSN || null,
};