process.env.NODE_ENV = "test"

const request = require("supertest")
const db = require("../dist/db")
const User = require("../dist/models/users")
const { UnauthorizedError } = require("../dist/expressError")


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

        try {
            isValid = await User.authenticate("Alice", "asdf")
        } catch (err) {
            expect(err.message).toBe("Invalid username/password")
        }
    })
})


describe("GetByUsername", () => {
    it("works", async () => {
        const user = await User.getByUsername("Alice")
        expect(user.username).toEqual("Alice")
        expect(user.isAdmin).toBeTruthy()
    })

    it("throws error if username not found", async () => {
        try {
            const user = await User.getByUsername("Bob")
        } catch (err) {
            expect(err.message).toBe("No user: Bob")
        }
    })
})


describe("GetByEmail", () => {
    it("works", async () => {
        const user = await User.getByEmail("alice@test.com")
        expect(user.username).toEqual("Alice")
        expect(user.isAdmin).toBeTruthy()
    })

    it("throws error if username not found", async () => {
        try {
            const user = await User.getByEmail("alice@test.org")
        } catch (err) {
            expect(err.message).toBe("No user with email: alice@test.org")
        }
    })
})

describe("FindAll", () => {
    it("works", async () => {
        const bob = await(User.register({
            username: "Bob",
            password: "test123",
            email: "bob@test.com",
            firstName: "Bob",
            isAdmin: false
        }))

        const users = await User.findAll()

        expect(users[0].username).toEqual("Alice")
        expect(users[1].username).toEqual("Bob")
    })

})

describe("Update", () => {

})

describe("Delete", () => {
    it("works", async () => {
        let result = await User.delete("Alice")

        try {
            result = await User.getByUsername("Alice")    
        } catch (err) {
            expect(err.message).toBe("No user: Alice")
        }
        

    })

    it("throws error if user doesn't exist", async () => {
        try {
            const result = await User.delete("Bob")
        } catch (err) {
            expect(err.message).toEqual("No user: Bob")
        }
    })
})

afterEach(async () => {
    await db.query("DELETE FROM users")
})

afterAll(async () => {
    await db.end()
})