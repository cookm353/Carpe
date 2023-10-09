process.env.NODE_ENV = "test"

const db = require("../dist/db")
const Entry = require("../dist/models/entry")
const User = require("../dist/models/users")

const goodEntry = {
    entryDate: new Date().toISOString().slice(0, 10),
    stressLevel: 4,
    sleepQuality: 8,
    activityLevel: 5,
    numDrinks: 0,
    numAuras: 0,
    numSeizures: 0,
    comments: ""
}

const invalidUserIdEntry = {
    entryDate: new Date().toISOString().slice(0, 10),
    stressLevel: 4,
    sleepQuality: 8,
    activityLevel: 5,
    numDrinks: 0,
    numAuras: 0,
    numSeizures: 0,
    comments: "",
    userId: 999
}

const commonBeforeAll = async () => {
    await db.query('ALTER SEQUENCE users_user_id_seq RESTART WITH 1')
    
    const alice = await(User.register({
        username: "alice",
        password: "test123",
        email: "alice2@test.com",
        firstName: "Alice",
        isAdmin: true
    }))

    const userIdResult = await db.query("SELECT user_id FROM users WHERE username = 'alice'")
    const userId = userIdResult.rows[0]['user_id']

    goodEntry['userId'] = userId
}

// beforeAll(async () => {
//     const alice = await(User.register({
//         username: "alice",
//         password: "test123",
//         email: "alice2@test.com",
//         firstName: "Alice",
//         isAdmin: true
//     }))
// })

// beforeAll(commonBeforeAll)

/* Entry.create() */

describe("Create", () => {
    beforeEach(commonBeforeAll)
    
    it("throws error if user ID not included", async () => {
        try {
            await Entry.create(invalidUserIdEntry)
        } catch (err) {
            expect(err.message).toBe("User not found")
        }
    })

    it("works", async () => {
        expect(goodEntry.userId).toBeTruthy()
        const result = await Entry.create(goodEntry)
        expect(result.rows[0]).toEqual()
    })
})

/* Entry.get() */

describe("Get", () => {
    beforeEach(commonBeforeAll)

    it('throws error if no entry found', async () => {
        try {
            Entry.get("test")
        } catch (err) {
            expect(err.message).toEqual("No user: test")
        }
    })
})

afterEach(async () => {
    await db.query("DELETE FROM users")
})

afterAll(async () => {
    await db.end()
})