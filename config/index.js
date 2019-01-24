const db = require('./db');
const server = require('./server');
const jwt = require('./jwt');
const env = process.env.NODE_ENV;
const sentry = require('./sentry');

module.exports = {env, db, server, jwt, sentry};