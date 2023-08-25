const jwt = require("jsonwebtoken")

const { UnauthorizedError } = require("../dist/expressError")
const { authenticateJWT, ensureLoggedIn, ensureIsAdmin, ensureIsAdminOrCorrectUser } = require ("../dist/middleware/auth")

const { SECRET_KEY } = require("../dist/config")
const goodJwt1 = jwt.sign({ username: "test", isAdmin: false}, SECRET_KEY)
const goodJwt2 = jwt.sign({ username: "tester", isAdmin: false}, SECRET_KEY)
const goodAdminJWT = jwt.sign({ username: "admin", isAdmin: true}, SECRET_KEY)
const badJwt = jwt.sign({ username: "bad", isAdmin: false}, "nope")


/* authenticateJWT() */

describe("authenticateJWT", () => {
    it("works w/ header", () => {
        const req = { headers: { authorization: `Bearer ${goodJwt1}`} }
        const res = { locals: {} }
        const next = function (err) {
            expect(err).toBeFalsy()
        }
        authenticateJWT(req, res, next)
        expect(res.locals).toEqual({
            user: {
                iat: expect.any(Number),
                username: "test",
                isAdmin: false
            }
        })
    })

    it("works w/o header", () => {
        const req = {}
        const res = { locals: {} }
        const next = function (err) {
            expect(err).toBeFalsy()
        }
        authenticateJWT(req, res, next)
        expect(res.locals).toEqual({})
    })

    it("catches invalid token", () => {
        const req = { headers: { authorization: `Bearer ${badJwt}`} }
        const res = { locals: {} }
        const next = function (err) {
            expect(err).toBeFalsy()
        }
        authenticateJWT(req, res, next)
        expect(res.locals).toEqual({})
    })
})

/* ensureIsAdminOrCorrectUser() */

describe("ensureIsAdminOrCorrectUser", () => {
    it("works with right user", () => {
        const req = { headers: { authorization: `Bearer ${goodJwt1}`} }
        const res = { locals: {} }
        const next = function (err) {
            expect(err).toBeFalsy()
        }
        ensureIsAdminOrCorrectUser(req, res, next)
        expect(res.locals).toEqual({
            user: {
                iat: expect.any(Number),
                username: "test",
                isAdmin: true
            }
        })
    })

    it("throws error if not right user", () => {
        const req = { headers: { authorization: `Bearer ${badJwt}`} }
        const res = { locals: {} }
        const next = function (err) {
            expect(err.message).toBe("invalid signature")
        }
        ensureIsAdminOrCorrectUser(req, res, next)
    })
})

/* ensureIsAdmin() */

describe("ensureIsAdmin", () => {
    it("works if admin", () => {
        const req = { headers: { authorization: `Bearer ${goodAdminJWT}`} }
        const res = { locals: {} }
        const next = function (err) {
            expect(err).toBeFalsy()
        }
        authenticateJWT(req, res, next)
        expect(res.locals).toEqual({
            user: {
                iat: expect.any(Number),
                username: "admin",
                isAdmin: true
            }
        })
    })

    it("throws error if not admin", () => {
        const req = { headers: { authorization: `Bearer ${goodJwt1}`} }
        const res = { locals: {} }
        const next = function (err) {
            expect(err.message).toBe("Unauthorized")
        }
        ensureIsAdmin(req, res, next)
    })
})