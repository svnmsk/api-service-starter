const R = require('ramda');
const wrap = require('express-async-wrap');
const UserService = require('../services/UserService');
const service = new UserService();

class UserController {

    static get create() {
        return wrap(async (req, res, next) => {
            await service.create(req.body);
            return res.json({
                success: true,
            });
        });
    }

    static get login() {
        return wrap(async (req, res, next) => {
            let user;
            try {
                user = await service.getByLogin(req.body.login);
                user.comparePassword(req.body.password, (e, isMatch) => {
                    if (e) return next(e);
                    if (isMatch) {
                        req.user = R.pick(['_id', 'login'], user);
                        next();
                    } else {
                        return next();
                    }
                });
            } catch (e) {
                next(e);
            }
        });
    }
}

module.exports = UserController;