const jwt = require("jsonwebtoken");
const { SECRET_KEY } = require("../config");
const { UnauthorizedError } = require('../expressError');
/** Middleware for authenticating users
 *
 * Verify a token if provided.  If token is valid, store payload
 * on res.locals
 *
 * Not providing a token or having an invalid token isn't an error
*/
function authenticateJWT(req, res, next) {
    try {
        const authHeader = req.headers && req.headers.authorization;
        if (authHeader) {
            const token = authHeader.replace(/^[Bb]earer /, "").trim();
            res.locals.user = jwt.verify(token, SECRET_KEY);
        }
        return next();
    }
    catch (err) {
        return next();
    }
}
/** Middleware used when a user needs to be logged in
 *
 * If not, raises Unauthorized
 */
function ensureLoggedIn(req, res, next) {
    try {
        if (!res.locals.user)
            throw new UnauthorizedError();
        return next();
    }
    catch (err) {
        return next(err);
    }
}
/** Middleware to check if user is an admin
 *
 * If not, raises Unauthorized
 */
function ensureIsAdmin(req, res, next) {
    try {
        const authHeader = req.headers && req.headers.authorization;
        if (authHeader) {
            const token = authHeader.replace(/^[Bb]earer /, "").trim();
            const user = jwt.verify(token, SECRET_KEY);
            if (!user.isAdmin)
                throw new UnauthorizedError();
            return next();
        }
        throw new UnauthorizedError;
    }
    catch (err) {
        return next(err);
    }
}
function ensureIsAdminOrCorrectUser(req, res, next) {
    try {
        const authHeader = req.headers && req.headers.authorization;
        if (authHeader) {
            const token = authHeader.replace(/^[Bb]earer /, "").trim();
            const user = jwt.verify(token, SECRET_KEY);
            if (user.username !== req.params.username && !user.isAdmin) {
                throw new UnauthorizedError();
            }
        }
        else {
            throw new UnauthorizedError();
        }
        if (!res.locals.user)
            throw new UnauthorizedError();
        return next();
    }
    catch (err) {
        return next(err);
    }
}
module.exports = {
    authenticateJWT,
    ensureLoggedIn,
    ensureIsAdmin,
    ensureIsAdminOrCorrectUser
};
