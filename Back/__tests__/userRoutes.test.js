process.env.NODE_ENV = "test"

const request = require("supertest")

const db = require("../dist/db")
const app = require("../dist/app")
const User = require('../dist/models/users')

const {
    commonBeforeAll,
    commonBeforeEach,
    commonAfterAll,
    commonAfterEach,
    adminJWT,
    userJWT
} = require('../dist/routes/_testCommon')
const { UnauthorizedError } = require('../dist/expressError')
const e = require("express")

// const commonBeforeAll = async () => {
//     await db.query("DELETE FROM users")

//     await User.register(
//         {
//             username: "chuck",
//             password: "test123",
//             email: "chuck@test.com",
//             firstName: "Chuck"
//         }
//     )
//     await User.register(
//         {
//             username: "tom", 
//             password: "test123", 
//             email: "tom@test.com", 
//             firstName: "Tom", 
//             isAdmin: true
//         }
//     )
// }

// beforeAll(commonBeforeAll)

// beforeAll(async () => {
//     await db.query("DELETE FROM users")

//     await User.register(
//         {
//             username: "chuck",
//             password: "test123",
//             email: "chuck@test.com",
//             firstName: "Chuck"
//         }
//     )
//     await User.register(
//         {
//             username: "tom", 
//             password: "test123", 
//             email: "tom@test.com", 
//             firstName: "Tom", 
//             isAdmin: true
//         }
//     )
// })

// beforeEach(commonBeforeEach)
// beforeEach(async () => {
//     await db.query('BEGIN')
// })

// afterEach(commonAfterEach)

afterEach(async () => {
    await db.query("ROLLBACK")
})

// afterAll(commonAfterAll)
afterAll(async () => {
    await db.end()
})

/* POST /user */

describe("POST /user", () => {
    it("works", async () => {
        expect("foo").toEqual("foo")
    } )
})

/* GET /user */

describe("GET /user", () => {
    beforeAll(commonBeforeAll)
    beforeEach(commonBeforeEach)

    it("throws error for non-admins", async () => {
        const resp = await request(app).get('/user')

        expect(resp.statusCode).toBe(401)
        expect(resp.body.error.message).toBe("Unauthorized")
    })

    it("retrieves user info for admin", async () => {
        const resp = await request(app)
        .get("/user")
        .set("authorization", `Bearer ${adminJWT}`)

        expect(resp.statusCode).toBe(200)
    })
})


/* GET /user/:username */

describe("GET /user/:username", () => {
    beforeAll(commonBeforeAll)

    it("throws error with no JWT", async () => {
        const resp = await request(app).get("/user/tom")
        expect(resp.statusCode).toBe(401)
    })

    // it("throws error with invalid JWT", async () => {

    // })

    // it("throws error for wrong user", async () => {

    // })

    it("works for right user", async () => {
        const resp = await request(app)
            .get('/user/chuck')
            .set('authorization', `Bearer ${userJWT}`)
        
        expect(resp.statusCode).toBe(200)
        expect(resp.body).toEqual({
            "user": {
                email: "chuck@test.com",
                firstName: "Chuck",
                isAdmin: false,
                username: "chuck"
            }
        })

    })

    it("works for admin on other user", async () => {        
        // await User.register(
        //     {
        //         username: "tom", 
        //         password: "test123", 
        //         email: "tom@test.com", 
        //         firstName: "Tom", 
        //         isAdmin: true
        //     }
        // )
        
        const resp = await request(app)
            .get("/user/tom")
            .set('authorization', `Bearer ${adminJWT}`)

        // expect(resp.body).toEqual()
        expect(resp.body.user.firstName).toEqual("Tom")
        expect(resp.statusCode).toBe(200)
    })
})

/* PATCH /user/:username */

describe("PATCH /user/:username", () => {

})

/* DELETE /user/:username */

describe("DELETE /user/:username", () => {

})