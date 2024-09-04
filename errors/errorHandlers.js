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

function globalErrorHandler(err, req, resp, _next) {
    logger.error('Unexpected server error', err);
    resp.status(500).render('./errors/500');
}

function notFoundHandler(msg) {
    return (req, resp, _next) => {
        resp.status(404).render('errors/404', { message: msg });
    }
}

module.exports = {
    withAsyncHandler,
    globalErrorHandler,
    notFoundHandler
}