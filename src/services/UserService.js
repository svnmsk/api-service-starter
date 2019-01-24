const R = require('ramda');
const UserModel = require('../models/User');
const BaseService = require('./BaseService');

class UserService extends BaseService {
    constructor() {
        super(UserModel);
    }

    async create(data) {
        data = R.pick(['login', 'password'], data);
        return this.createBase(data);
    }

    async getByLogin(login) {
        return this.singleBase({match: {login}});
    }
}

module.exports = UserService ;