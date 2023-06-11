const db = require("../db");
const bcrypt = require("bcrypt");
const { BadRequestError, NotFoundError } = require("../expressError");
const { BCRYPT_WORK_FACTOR } = require("../config");
/** Class to handle all user-related actions */
class User {
    username;
    email;
    firstName;
    isAdmin;
    constructor(username, email, firstName, isAdmin) {
        this.username = username;
        this.email = email;
        this.firstName = firstName;
        this.isAdmin = isAdmin;
    }
    /** Register a new user
     *
     * Returns User object
     *
     * Throws BadRequestError if username taken or email already used
      */
    static async register({ username, password, email, firstName, isAdmin }) {
        const duplicateUsernameCheck = await db.query(`SELECT username
            FROM users
            WHERE username = $1`, [username]);
        const duplicateEmailCheck = await db.query(`SELECT email
            FROM users
            WHERE email = $1`, [email]);
        if (duplicateUsernameCheck.rows[0]) {
            throw new BadRequestError(`Duplicate username: ${username}`);
        }
        else if (duplicateEmailCheck.rows[0]) {
            throw new BadRequestError(`Account already exists with email address ${email}`);
        }
        const hashedPassword = await bcrypt.hash(password, BCRYPT_WORK_FACTOR);
        const result = await db.query(`INSERT INTO users (
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
            `, [username, hashedPassword, firstName, email, isAdmin]);
        return result.rows[0];
    }
    /** Authenticate a user's attempt to login
     *
     * Returns true if user is successfully authenticated
     */
    static async authenticate(username, password) {
        const result = await db.query(`SELECT password
            FROM users
            WHERE username = $1`, [username]);
        const hashedPassword = result.rows[0].password;
        const isValid = await bcrypt.compare(password, hashedPassword);
        return isValid;
    }
    /** Retrieve user's info based on username
     *
     * Returns User object if found
     * Returns NotFoundError if user can't be found
     *
     */
    static async getByUsername(username) {
        const result = await db.query(`SELECT
                username,
                first_name AS "firstName",
                email,
                is_admin AS "isAdmin"
            FROM users
            WHERE username = $1`, [username]);
        const user = result.rows[0];
        if (!user)
            throw new NotFoundError(`No user: ${username}`);
        return new User(user.username, user.email, user.firstName, user.isAdmin);
    }
    /** Retrieve user's info based on email
     *
     * Returns User object if found
     * Returns NotFoundError if user can't be found
     *
     */
    static async getByEmail(email) {
        const result = await db.query(`SELECT
                    username,
                    first_name AS "firstName",
                    email,
                    is_admin AS "isAdmin"
                FROM users
                WHERE email = $1`, [email]);
        const user = result.rows[0];
        if (!user)
            throw new NotFoundError(`No user with email: ${email}`);
        return new User(user.username, user.email, user.firstName, user.isAdmin);
    }
    static async findAll() {
        const result = await db.query(`SELECT
                username,
                first_name AS "firstName",
                email,
                is_admin AS "isAdmin"
            FROM users`);
        const users = result.rows.map(row => {
            return new User(row.username, row.email, row.firstName, row.isAdmin);
        });
        return users;
    }
    /** Update user info
     *
     *
     */
    static async update() {
    }
    /** Deletes specified user
     *
     * Returns undefined
     *
     * Throws NotFoundError if user doesn't exist
     */
    static async delete(username) {
        const result = await db.query(`DELETE
            FROM users
            WHERE username = $1
            RETURNING username`, [username]);
        const user = result.rows[0];
        if (!user)
            throw new NotFoundError(`No user: ${username}`);
    }
    /** Retrieve entries made by user
     *
     */
    static async getEntries(username) {
    }
}
module.exports = User;
