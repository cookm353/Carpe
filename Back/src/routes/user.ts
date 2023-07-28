/* User class */
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")

const db = require("../db")
const { ensureLoggedIn, ensureIsAdmin, ensureIsAdminOrCorrectUser} = require("../middleware/auth")
const ExpressError = require("../expressError")
const { BCRYPT_WORK_FACTOR } = require("../config")
const User = require("../models/users")

const router = express.Router()

/** POST /user/
 * 
 * Allows admins to add new users
 * 
 * Authorization required: admin
 */

router.post("/", ensureIsAdmin, async (req, res, next) => {

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
        
    } catch (err) {
        
    }
})

/** GET /user/[username] => { user }
 * 
 * Returns { username, email, firstName, isAdmin}
 * 
 * Auth required: admin or correct user
 */

router.get("/:username", ensureIsAdminOrCorrectUser, async (req, res, next) => {
    try {
        
    } catch (err) {
        
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

router.patch("/:username", ensureIsAdminOrCorrectUser, async (req, res, next) => {
    try {
        
    } catch (err) {
        
    }
})

/** DELETE /user/[username] => { deleted: username } 
 * 
 * Auth required: admin or correct user
*/

router.delete("/:username", ensureIsAdminOrCorrectUser, async (req, res, next) => {
    try {
        
    } catch (err) {
        
    }
})