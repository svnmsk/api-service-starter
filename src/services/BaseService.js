const R = require('ramda');
const ApplicationError = require('../errors/ApplicationError');
const READ_ONLY_FIELDS_DEFAULT = ['_id', 'deleted', 'createdAt', 'updatedAt'];

class BaseService {
    constructor(model, {readOnlyFields = []} = {}) {
        this.model = model;
        this.readOnlyFields = R.uniq(R.concat(READ_ONLY_FIELDS_DEFAULT, readOnlyFields));
    }

    payloadFilter(data) {
        return R.omit(this.readOnlyFields, data);
    }

    dbError(e, data = {}) {

        if (e.code === 11000) {
            throw new ApplicationError('Already exists', {data: R.omit(['password'], data)});
        }

        if (e.name === 'ValidationError') {
            throw new ApplicationError(this.concatValidationErrors(e));
        }

        throw new ApplicationError({data, reason: e});
    }

    async getRecordsCount(match) {
        try {
            return this.model.countDocuments(match);
        } catch (e) {
            this.dbError(e, {match});
        }
    }

    getPagesCount(count, limit) {
        return Math.ceil(count / limit) || 1;
    }

    makeSkip(page, limit) {
        return page <= 1 ? 0 : page * limit - limit
    }

    concatValidationErrors(e) {
        return R.pipe(R.valuesIn(), R.map(R.prop('message')), R.join(' '))(e.errors);
    }

    async listBase({ match = {}, select = '', populate = '', sort = {}, skip = 0, limit = 0 } = {}) {
        try {
            return await this.model
                .find(match)
                .sort(sort)
                .select(select)
                .skip(skip)
                .limit(limit)
                .populate(populate);
        } catch (e) {
            this.dbError(e);
        }
    }

    async singleBase({ match = {}, select = '' } = {}) {
        let  record;
        const err = () => { throw new ApplicationError('Not found', {status: 404}); };

        if (R.equals(R.length(R.keysIn(match)), 0)) err();

        try {
            record = await this.model
                .findOne(match)
                .select(select);
        } catch (e) {
            err();
        }

        if (R.isNil(record)) err();

        return record;
    }

    async createBase(data) {
        try {
            return await this.model(data).save();
        } catch (e) {
            this.dbError(e, data);
        }
    }

    async upsertBase({query = {}, data = {}} = {}) {
        const options = {upsert: true};
        data = R.omit(READ_ONLY_FIELDS_DEFAULT, data);
        console.log('query', query);
        console.log('data', data);
        try {
            return await this.model.updateOne({query, data, options});
        } catch (e) {
            this.dbError(e, data);
        }
    }

    async updateBase(_id, data) {
        try {
            await this.model.updateOne({_id}, this.payloadFilter(data), {runValidators:true});
        } catch (e) {
            this.dbError(e, data);
        }
    }
}

module.exports = BaseService;