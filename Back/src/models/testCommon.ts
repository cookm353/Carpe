const bcrypt = require("bcrypt")

const db = require("./db")
const { BCRYPT_WORK_FACTOR } = require("./config")

const commonBeforeAll = async () => {
    const alice = await(User.register({
        username: "Alice",
        password: "test123",
        email: "alice@test.com",
        firstName: "Alice",
        isAdmin: true
    }))
}

const commonBeforeEach = async () => {
    await db.query("BEGIN")
}

const commonAfterEach = async () => {
    await db.query("ROLLBACK")
}

const commonAfterAll = async () => {
    await db.end()
}