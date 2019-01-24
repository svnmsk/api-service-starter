const R = require('ramda');
const jwt = require('jsonwebtoken');
const tokenType = require('../enums/tokenType');
const ApplicationError = require('../errors/ApplicationError');
const config = require('../../config');

const PREFIX = 'Bearer';

class JWTService {

    /**
     * Generates JWT pair
     * @public
     * @param user {object}
     * @returns {{access: string, refresh: string}}
     */
    static generatePair(user) {
        return {
            access: this.generate(user, tokenType.ACCESS),
            refresh: this.generate(user, tokenType.REFRESH),
        }
    }

    /**
     * Generates JWT of specific type
     * @private
     * @param user{object}
     * @param type {string}
     * @throws ApplicationError
     * @returns {string}
     */
    static generate(user, type) {
        let expiresIn;
        switch (type) {
            case tokenType.ACCESS:
                expiresIn = config.jwt.duration.access;
                break;
            case tokenType.REFRESH:
                expiresIn = config.jwt.duration.refresh;
                break;
            default:
                throw new ApplicationError('Invalid token type');
        }
        const payload = R.pick(['_id', 'login'], user);
        const data = {expiresIn};
        const secret = config.jwt.secret;

        return `${PREFIX} ${jwt.sign(payload, secret, data)}`;
    }
}

module.exports = JWTService;