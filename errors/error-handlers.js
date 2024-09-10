const logger = require('../utils/logger')('error_handler');

function withAsyncHandler(fn) {
    return async (req, resp, next) => {
        try {
            await fn(req, resp, next);
        } catch (err) {
            logger.error(err);
            next(err);
        }
    }
}

module.exports = { withAsyncHandler }