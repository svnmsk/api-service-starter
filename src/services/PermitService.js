const R = require('ramda');
const mongoose = require('mongoose-fill');
const PermitModel = require('../models/Permit');
const BaseService = require('./BaseService');
const ApplicationError = require('../errors/ApplicationError');
const utils = require('../utils');
const readOnlyFields = ['number'];

class PermitService extends BaseService {

    constructor() {
        super(PermitModel, {readOnlyFields});
    }

    /**
     * Returns permits list
     * @public
     * @param limit {Number}
     * @param page {Number}
     * @throws ApplicationError
     * @returns {Promise<{pages: *, page: (Number.page|*), limit: (Number.limit|*), items: *}>}
     */
    async list({limit, page}) {
        let match = {deleted: false,};

        const count = await this.getRecordsCount(match);
        limit = utils.normalizeNumber(limit, {def: 100, min: 1, max: 500});
        page = utils.normalizeNumber(page, {def: 1, min: 1, max: count});

        const items = await this.listBase({
            select: '',
            sort: {updatedAt: -1},
            limit: Number(limit),
            match,
            skip: this.makeSkip(page, limit)
        });

        return {
            pages: this.getPagesCount(count, limit),
            page,
            limit,
            items
        };
    }

    /**
     * Returns permit by id
     * @public
     * @param _id {ObjectId} MongoDB object id
     * @throws ApplicationError
     * @returns {Promise<{Client}>}
     */
    async single(_id) {
        if (!mongoose.Types.ObjectId.isValid(_id)) throw new ApplicationError('Invalid params', {data: {id: _id}});
        return this.singleBase({match: {_id}});
    }

    /**
     * Returns permit by params
     * @public
     * @param params {Object}
     * @throws ApplicationError
     * @returns {Promise<{Client}>}
     */
    async searchOne(params) {
        return this.singleBase({match: params});
    }

    /**
     * Creates new permit record
     * @public
     * @param data {object} request body
     * @throws ApplicationError
     * @returns {Promise<*>}
     */
    async create(data) {
        data = R.pick(['number', 'firstName', 'firstName', 'lastName'], data);
        return this.createBase(data);
    }

    /**
     * Updates permit record
     * @param data {object} request body
     * @public
     * @throws ApplicationError
     * @returns {Promise<void>}
     */
    async update(_id, data) {
        if (!mongoose.Types.ObjectId.isValid(_id)) throw new ApplicationError('Invalid params', {data: {id: _id}});
        return this.updateBase(_id, data);
    }

}

module.exports = PermitService;