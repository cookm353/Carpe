const jwt = require("jsonwebtoken")
const { SECRET_KEY } = require("../config")
const { UnauthorizedError} = require ('../expressError')

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