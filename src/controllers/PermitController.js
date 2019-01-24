const R = require('ramda');
const wrap = require('express-async-wrap');
const PermitService = require('../services/PermitService');
const service = new PermitService();

class PermitController {

    static get create() {
        return wrap(async (req, res, next) => {
            const data = await service.create(req.body);
            return res.json({
                success: true,
                data
            });
        });
    }

    static get single() {
        return wrap(async (req, res, next) => {
            const rec = await service.single(req.params.id);
            return res.json({
                success: true,
                data: rec
            });
        });
    }

    static get searchOne() {
        return wrap(async (req, res, next) => {
            const rec = await service.searchOne(R.pick(['number'], req.query));
            return res.json({
                success: true,
                data: rec
            });
        });
    }

    static get list() {
        return wrap(async (req, res, next) => {
            const data = await service.list(req.query);
            return res.json({
                success: true,
                data
            });
        })
    }

    static get update() {
        return wrap(async (req, res, next) => {
            await service.update(req.params.id, req.body);
            return res.json({
                success: true,
            });
        })
    }
}

module.exports = PermitController;