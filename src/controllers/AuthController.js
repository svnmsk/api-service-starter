const JWTService = require('../services/JWTService');
const ApplicationError = require('../errors/ApplicationError');
const jwt = require('express-jwt');
const config = require('../../config');

class AuthController {

    static get auth() {
        return jwt({secret: config.jwt.secret});
    }

    static provideToken(req, res, next) {
        if (!req.user) throw new ApplicationError('Unauthorized', {status: 401});
        const data = JWTService.generatePair(req.user);

        return res.json({
            success: true,
            data,
        });
    }
}


module.exports = AuthController;