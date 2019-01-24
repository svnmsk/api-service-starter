require('dotenv').config();

module.exports = {
    secret: process.env.JWT_SECRET,
    duration: {
        access: process.env.JWT_DURATION,
        refresh: process.env.JWT_DURATION_REFRESH,
    },
};