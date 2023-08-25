/* User routes */

const jsonschema = require("jsonschema")
const express = require("express")

const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")

const db = require("../db")
const { ensureLoggedIn, ensureIsAdmin, ensureIsAdminOrCorrectUser} = require("../middleware/auth")
const { ExpressError, BadRequestError } = require("../expressError")
const { BCRYPT_WORK_FACTOR } = require("../config")
const User = require("../models/users")
const { createToken } = require('../helpers/tokens')
const userNewSchema = require('../../schemas/userNewSchema.json')
const userUpdateSchema = require("../../schemas/userUpdateSchema.json")
// const userUpdateSchema;

const router = express.Router()

/** POST /user/
 * 
 * Allows admins to add new users
 * 
 * Authorization required: admin
 */

// router.post("/", ensureIsAdmin, async (req, res, next) => {
router.post("/", async (req, res, next) => {
    try {
        // const { username, password, email, firstName, isAdmin = false } = req.body
        // console.log(isAdmin)
        const validator = jsonschema.validate(req.body, userNewSchema)
        if ( !validator.valid ) {
            const errs = validator.errors.map(e => e.stack)
            throw new BadRequestError(errs)
        }

        const user = await User.register(req.body)
        const token = createToken(user)
        
        return res.status(201).json({ user, token })
    } catch (err) {
        return next(err)
    }
})

/** GET /user/ => { users: [ user1, user2, ... ] }
 * 
 * Returns list of all users
 * 
 * Authorization required: login
 */

// router.get("/", ensureLoggedIn, async (req, res, next) => {
router.get("/", async (req, res, next) => {
    try {
        const users = await User.findAll()
        return res.json({users})
    } catch (err) {
        return next(err)
    }
})

/** GET /user/[username] => { user }
 * 
 * Returns { username, email, firstName, isAdmin}
 * 
 * Auth required: admin or correct user
 */

// router.get("/:username", ensureIsAdminOrCorrectUser, async (req, res, next) => {
router.get("/:username", async (req, res, next) => {
    try {
        const user = await User.getByUsername(req.params.username)
        return res.json({ user })
    } catch (err) {
        return next(err)
    }
})

/** PATCH /user/[username] { user } => { user } 
 * 
 * Data can include:
 *  { firstName, password, email }
 * 
 * returns { username, firstName, email }
 * 
 * Auth required: admin or correct user
*/

// router.patch("/:username", ensureIsAdminOrCorrectUser, async (req, res, next) => {
router.patch("/:username", async (req, res, next) => {
    try {
        const validator = jsonschema.validate(req.body, userUpdateSchema)
        if ( !validator.valid ) {
            const errs = validator.errors.map(e => e.stack)
            throw new BadRequestError(errs)
        }
        
        const username = req.params.username
        let updatedUserInfo = {}
        for (let key in req.body) {
            updatedUserInfo[key] = req.body[key]
        }

        const result = await User.update(updatedUserInfo, username)
        return res.json(result)
    } catch (err) {
        return next(err)
    }
})

/** DELETE /user/[username] => { deleted: username } 
 * 
 * Auth required: admin or correct user
 * 
 * Returns { deleted: username }
*/

// router.delete("/:username", ensureIsAdminOrCorrectUser, async (req, res, next) => {
router.delete("/:username", async (req, res, next) => {
    try {
        await User.delete(req.params.username)
        return res.json({ deleted: req.params.username })
    } catch (err) {
        return next(err)
    }
})

module.exports = router