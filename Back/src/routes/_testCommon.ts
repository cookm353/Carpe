process.env.NODE_ENV = "test"

const bcrypt = require("bcrypt")

const db = require('../db')
const User = require("../models/users")
const { BCRYPT_WORK_FACTOR } = require("../config")
const { createToken } = require("../helpers/tokens")

async function commonBeforeAll() {
    // await db.query('DELETE FROM entries')
    await db.query('DELETE FROM users')

    await User.register(
        {
            username: "chuck",
            password: "test123",
            email: "chuck@test.com",
            firstName: "Chuck"
        }
    )
    // await User.register(
    //     {
    //         username: "tom", 
    //         password: "test123", 
    //         email: "tom@test.com", 
    //         firstName: "Tom", 
    //         isAdmin: true
    //     }
    // )
}

async function commonBeforeEach() {
    await db.query("BEGIN")
}

async function commonAfterEach() {
    await db.query("ROLLBACK")
}

async function commonAfterAll() {
    await db.end()
}

const adminJWT = createToken({username: "tom", isAdmin: true})
const userJWT = createToken({username: "chuck", isAdmin: false})

module.exports = {
    commonBeforeAll
    commonBeforeEach
    commonAfterAll
    commonAfterEach
    adminJWT
    userJWT
}