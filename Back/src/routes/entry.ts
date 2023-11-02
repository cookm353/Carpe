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

/** POST /entry/:username
 * 
 * Allows new entries to be added
 * 
 * Authorization required: correct user or admin 
 */

router.post("/:username", ensureLoggedIn, async (req, res, next) => {
    try {
        const { username } = req.params
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

router.get("/:username", ensureIsAdminOrCorrectUser, async (req, res, next) => {
    try {
        const { username } = req.params
        const entries = await Entry.getAll(username)

        return res.json({entries})
    } catch (err) {
        return next(err)
    }
})

/** GET /entry/:username/:date
 * 
 * Retrieve entries made by user on specified date
 * 
 * Auth required: correct user or admin
 */

router.get("/:username/:date", ensureIsAdminOrCorrectUser, async (req, res, next) => {
    try {
        const { username, date } = req.params

        const entry = await Entry.get(username, date)
        return res.json({entry})
    } catch (err) {
        return next(err)
        
    }
})

router.get("/:username/years", async (req, res, next) => {
    try {
        console.log('getting years')
        const {username} = req.params

        const years = await Entry.getEntryYears(username)
        console.log(years)
        return res.json({years})
    } catch (err) {
        return next(err)
    }
})


router.delete("/:username/:date", ensureIsAdminOrCorrectUser, async (req, res, next) => {
    try {
        const { username, date } = req.params
        await Entry.delete(username, date)
        return res.json({"foo": "bar"})
    } catch (err) {
        return next(err)
    }
})

module.exports = router