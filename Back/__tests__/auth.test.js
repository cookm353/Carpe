const jwt = require("jsonwebtoken")

const { UnauthorizedError } = require("../dist/expressError")
const { authenticateJWT, ensureLoggedIn } = require ("../dist/middleware/auth")

const { SECRET_KEY } = require("../dist/config")
// const testJwt = jwt.sign("")

test("maths", () => {
    expect(6).toEqual(6)
})