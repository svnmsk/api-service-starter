require('dotenv').config();

module.exports = {
    port: process.env.APPLICATION_PORT || 3000,
};