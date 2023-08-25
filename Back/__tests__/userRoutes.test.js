process.env.NODE_ENV = "test"

const request = require("supertest")

const db = require("../dist/db")
const app = require("../dist/app")
const User = require('../dist/models/users')

const {
    commonBeforeAll,
    commonBeforeEach,
    commonAfterAll,
    commonAfterEach
} = require('../dist/routes/_testCommon')

beforeAll(commonBeforeAll)
beforeEach(commonBeforeEach)
afterEach(commonAfterEach)
afterAll(commonAfterAll)

/* POST /user */

describe("POST /user", () => {
    it("works", async () => {
        expect("foo").toEqual("foo")
    } )
})

/* GET /user */



/* GET /user/:username */


/* PATCH /user/:username */


/* DELETE /user/:username */
