const db = require("../db")
const bcrypt = require("bcrypt")

const { BadRequestError, NotFoundError } = require("../expressError")
const { BCRYPT_WORK_FACTOR } = require("../config")

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
     * Returns User object
     * 
     * Throws BadRequestError if username taken or email already used
      */

    static async register(
        { username, password, email, firstName, isAdmin }
    ) {
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
    static async authenticate(username, password) {
        const result = await db.query(
            `SELECT password
            FROM users
            WHERE username = $1`,
            [username]
        )

        const hashedPassword = result.rows[0].password
        const isValid = await bcrypt.compare(password, hashedPassword)

        return isValid
    }

    static async find(username) {

    }

    static async findAll() {

    }
}

module.exports = User