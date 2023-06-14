process.env.NODE_ENV = "test"

const request = require("supertest")
const db = require("../dist/db")
const Entry = require("../dist/models/entry")
const User = require("../dist/models/users")

test("", () => {
    expect(6).toEqual(6)
})