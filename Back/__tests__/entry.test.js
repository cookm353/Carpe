process.env.NODE_ENV = "test"

const request = require("supertest")
const db = require("../dist/db")
const Entry = require("../dist/models/entry")
const User = require("../dist/models/users")

const testEntry = {
    entryDate: new Date().toISOString().slice(0, 10),
    stressLevel: 4,
    sleepQuality: 8,
    activityLevel: 5,
    numDrinks: 0,
    numAuras: 0,
    numSeizures: 0,
    comments: "",
    userId: 2
}

beforeAll(async () => {
    const alice = await(User.register({
        username: "alice",
        password: "test123",
        email: "alice2@test.com",
        firstName: "Alice",
        isAdmin: true
    }))
})

/* Entry.create() */

describe("Create", () => {
    it("throws error if user not found", async () => {
        const alice = await User.getByUsername("alice")
        expect(alice.username).toEqual("alice")
        // expect(alice.username).toBe("alice")
        // const result = await Entry.create(testEntry)
        // const result = await db.query(`SELECT user_id FROM users WHERE username = "alice";`)
        // const userId = result.rows[0]
        // expect(userId).toEqual()

    })
})

/* Entry.get() */

// describe("Get", () => {

// })

afterEach(async () => {
    await db.query("DELETE FROM users")
})

afterAll(async () => {
    await db.end()
})