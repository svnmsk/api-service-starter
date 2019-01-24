class ApplicationError extends Error {
    constructor(message, params = {}) {
        super(message, params);

        const defaultParams = {
            name: 'ApplicationError',
            message: 'An error occurred.',
            reason: {},
            data: {},
            status: 400,
        };
        params.message = message;
        Object.assign(this, defaultParams, params);
        Error.captureStackTrace(this, this.constructor);
    }
}

module.exports = ApplicationError;
