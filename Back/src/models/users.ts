const db = require("../db")
const bcrypt = require("bcrypt")

const { BadRequestError, NotFoundError, UnauthorizedError } = require("../expressError")
const { BCRYPT_WORK_FACTOR } = require("../config")
const { sqlForPartialUpdate } = require('../helpers/sql')
// const { userUpdateSchema } = require("../../schemas/userUpdateSchema.json")

/** Class to handle all user-related actions */

class User {
    username: string
    email: string
    firstName: string
    isAdmin: boolean
    
    constructor(username: string, email: string, firstName: string, isAdmin: boolean) {
        this.username = username
        this.email = email
        this.firstName = firstName
        this.isAdmin = isAdmin
    }
    
    /** Register a new user
     * 
     * Throws BadRequestError if username taken or email already used
      */

    static async register(
        { username, password, email, firstName, isAdmin = false }
    ) {
        // console.log(isAdmin)
        const duplicateUsernameCheck = await db.query(
            `SELECT username
            FROM users
            WHERE username = $1`,
            [username]
        )
        const duplicateEmailCheck = await db.query(
            `SELECT email
            FROM users
            WHERE email = $1`,
            [email]
        )

        if ( duplicateUsernameCheck.rows[0] ) {
            throw new BadRequestError(`Duplicate username: ${username}`)
        } else if ( duplicateEmailCheck.rows[0] ) {
            throw new BadRequestError(`Account already exists with email address ${email}`)
        }
        
        const hashedPassword = await bcrypt.hash(password, BCRYPT_WORK_FACTOR)

        const result = await db.query(
            `INSERT INTO users (
                username,
                password,
                first_name,
                email,
                is_admin
            )
            VALUES ($1, $2, $3, $4, $5)
            RETURNING
                username,
                password,
                first_name as "firstName",
                email,
                is_admin as "isAdmin"
            `,
            [username, hashedPassword, firstName, email, isAdmin]
        )

        return result.rows[0]
    }

    /** Authenticate a user's attempt to login
     * 
     * Returns true if user is successfully authenticated 
     */
    static async authenticate(username, password) {
        const result = await db.query(
            `SELECT 
                username, 
                first_name AS "firstName", 
                password, 
                is_admin AS "isAdmin",
                email
            FROM users
            WHERE username = $1`,
            [username]
        )
        
        const u = result.rows[0]

        if ( u ) {
            const isValid = await bcrypt.compare(password, u.password)

            if (isValid) return new User(u.username, u.firstName, u.email, u.isAdmin)
        }

        throw new UnauthorizedError("Invalid username/password")
    }

    /** Retrieve user's info based on username
     * 
     * Returns User object if found
     * Returns NotFoundError if user can't be found
     * 
     */

    static async getByUsername(username) {
        const result = await db.query(
            `SELECT
                username,
                first_name AS "firstName",
                email,
                is_admin AS "isAdmin",
                user_id AS "userId"
            FROM users
            WHERE username = $1`,
            [username]
        )

        const user = result.rows[0]
        
        if (!user) throw new NotFoundError(`No user: ${username}`)
        
        return new User(user.username, user.email, user.firstName, user.isAdmin)
    }

    /** Retrieve user's info based on email
     * 
     * Returns User object if found
     * Returns NotFoundError if user can't be found
     * 
     */

    static async getByEmail(email) {
        const result = await db.query(
            `SELECT
                username,
                first_name AS "firstName",
                email,
                is_admin AS "isAdmin"
            FROM users
            WHERE email = $1`,
            [email]
        )

        const user = result.rows[0]
        
        if (!user) throw new NotFoundError(`No user with email: ${email}`)
        
        return new User(user.username, user.email, user.firstName, user.isAdmin)
    }

    /**
     * Retrieve details for all users     * 
     */

    static async findAll() {
        const result = await db.query(
            `SELECT
                username,
                first_name AS "firstName",
                email,
                is_admin AS "isAdmin"
            FROM users`
        )

        const users: Array<User> = result.rows.map(row => {
            return new User(row.username, row.email, row.firstName, row.isAdmin)
        })

        return users
    }

    /** Update user info
     * 
     * Regular users can update first name, email, or password
     * Admins can set other users to admin
     * 
     * Throws NotFoundError if user doesn't exist
     * Returns updated user
     */

    static async update(userInfo, username) {        
        if (userInfo.password) {
            userInfo.password = await bcrypt.hash(userInfo.password, BCRYPT_WORK_FACTOR)
        }
        
        let result = await db.query(
            `SELECT *
            FROM users
            WHERE username = $1`,
            [username]
        )

        const user = result.rows[0]
        if (!user) throw new NotFoundError(`No user: ${username}`)

        const { setCols, values } = sqlForPartialUpdate(userInfo)
        const usernameIdx = "$" + (values.length + 1)

        const querySql = `UPDATE users
            SET ${setCols}
            WHERE username = ${usernameIdx}
            RETURNING username,
                first_name AS "firstName",
                email,
                is_admin AS "isAdmin"
        `

        result = await db.query(querySql, [...values, username] )
        return(result.rows[0])
    }

    /** Deletes specified user
     * 
     * Returns undefined
     * 
     * Throws NotFoundError if user doesn't exist
     */
    static async delete(username) {
        let result = await db.query(
            `SELECT *
            FROM users
            WHERE username = $1`,
            [username]
        )
        
        const user = result.rows[0]
        if (!user) throw new NotFoundError(`No user: ${username}`)

        result = await db.query(
            `DELETE
            FROM users
            WHERE username = $1
            RETURNING username`,
            [username] 
        )

    }

    /** Retrieve entries made by user
     * 
     */

    static async getEntries(username) {

    }
}

module.exports = User