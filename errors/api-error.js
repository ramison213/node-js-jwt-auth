module.exports = class ApiError extends Error {
    constructor(status, msg, errors = []) {
        super(msg);

        this.status = status;
        this.errors = errors;
    }

    static UnauthorizedError() {
        return new ApiError(401, 'Unauthorized');
    }

    static BadRequest(msg, errors = []) {
        return new ApiError(400, msg, errors);
    }
}