module.exports = class BaseError extends Error {
    status
    errors
    constructor(status, message, errors){
        super(message)
        this.status = status
        this.errors = errors
    }

    static BadRequest(message, errors =[]) {
        return new BaseError(400, message, errors)
    }

    static UnAuthorized(message, errors =[]) {
        return new BaseError(401, message, errors)
    }

    static NotFoundException(message, errors =[]) {
        return new BaseError(404, message, errors)
    }

    static ForbiddenException(message, errors =[]) {
        return new BaseError(403, message, errors)
    }
}