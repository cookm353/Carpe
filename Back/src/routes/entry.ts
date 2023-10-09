/* Entry routes */

const jsonschema = require("jsonschema")
const express = require("express")

const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")

const db = require("../db")
const { ensureLoggedIn, ensureIsAdmin, ensureIsAdminOrCorrectUser} = require("../middleware/auth")
const { ExpressError, BadRequestError } = require("../expressError")
const { BCRYPT_WORK_FACTOR } = require("../config")
const { SECRET_KEY } = require("../config")
const Entry = require("../models/entry")
const User = require("../models/users")
// const userNewSchema = require('../../schemas/userNewSchema.json')
// const userUpdateSchema = require("../../schemas/userUpdateSchema.json")

const router = express.Router()

/** POST /entry/
 * 
 * Allows new entries to be added
 * 
 * Authorization required: correct user or admin 
 */

router.post("/", ensureLoggedIn, async (req, res, next) => {
    try {
        const token = req.headers.authorization
        const { username } = jwt.verify(token, SECRET_KEY)
        const entryInfo = req.body
        const entry = await Entry.create(username, entryInfo)       

        return res.status(201).json({entry})
    } catch (err) {
        return next(err)
    }
})

/** GET /entry/
 * 
 * Retrieves a user's entries
 * 
 * Auth require: correct user or admin
 */

router.get("/", ensureLoggedIn, async (req, res, next) => {
    try {
        
    } catch (err) {
        return next(err)
    }
})

module.exports = router