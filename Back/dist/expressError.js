/* Extension of vanilla error to add status code */
class ExpressError extends Error {
    constructor(message, status) {
        super();
        this.message = message;
        this.status = status;
    }
}
/** 404 not found error */
class NotFoundError extends ExpressError {
    constructor(message = "Not Found") {
        super(message, 404);
    }
}
/** 401 unauthorized error. */
class UnauthorizedError extends ExpressError {
    constructor(message = "Unauthorized") {
        super(message, 401);
    }
}
/** 400 bad request error. */
class BadRequestError extends ExpressError {
    constructor(message = "Bad Request") {
        super(message, 400);
    }
}
/** 403 forbidden error. */
class ForbiddenError extends ExpressError {
    constructor(message = "Bad Request") {
        super(message, 403);
    }
}
module.exports = {
    ExpressError,
    NotFoundError,
    UnauthorizedError,
    BadRequestError,
    ForbiddenError,
};
