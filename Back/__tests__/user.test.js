process.env.NODE_ENV = "test"

const request = require("supertest")
const db = require("../dist/db")
const User = require("../dist/models/users")


beforeEach(async () => {
    const alice = await(User.register({
        username: "Alice",
        password: "test123",
        email: "alice@test.com",
        firstName: "Alice",
        isAdmin: true
    }))
})

describe("Register", () => {
    it("works", async () => {
        const bob = await(User.register({
            username: "Bob",
            password: "test123",
            email: "bob@test.com",
            firstName: "Bob",
            isAdmin: false
        }))

        expect(bob.username).toEqual("Bob")
    })

    it("throws error on duplicate username", async() => {
        try {
            const alice2 = await(User.register({
                username: "Alice",
                password: "test123",
                email: "alice@test.org",
                firstName: "Alice",
                isAdmin: false
            }))
        } catch (err) {
            expect(err.message).toBe("Duplicate username: Alice")
        }
    })

    it("throws error on duplicate email", async() => {
        try {
            const alice2 = await(User.register({
                username: "Ally",
                password: "test123",
                email: "alice@test.com",
                firstName: "Alice",
                isAdmin: false
            }))
        } catch (err) {
            expect(err.message).toBe("Account already exists with email address alice@test.com")
        }
    })
})

describe("Login", () => {
    it("works", async () => {
        let isValid = await User.authenticate("Alice", "test123")
        expect(isValid).toBeTruthy()

        isValid = await User.authenticate("Alice", "asdf")
        expect(isValid).toBeFalsy()
    })
})

afterEach(async () => {
    await db.query("DELETE FROM users")
})

afterAll(async () => {
    await db.end()
})