const jwt = require("jsonwebtoken")
const { SECRET_KEY } = require("../config")
const { UnauthorizedError} = require ('../expressError')

/** Middleware for authenticating users 
 * 
 * Verify a token if provided.  If token is valid, store payload
 * on res.locals
 * 
 * Not providing a token or having an invalid token isn't an error
*/

function authenticateJWT(req, resp, next) {
    try{
        const authHeader = req.headers && req.headers.authorization

        if (authHeader) {
            const token = authHeader.repl
        }
    } catch (err) {
        return next()
    }
}