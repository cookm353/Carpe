const db = require('../db');
const { BadRequestError, NotFoundError } = require('../expressError');
const { sqlForPartialUpdate, sqlForEntryCreation } = require("../helpers/sql");
const today = new Date().toISOString().slice(0, 10);
const monthMap = {
    "jan": 0, "feb": 1, "mar": 2, "apr": 3,
    "may": 4, "jun": 5, "jul": 6, "aug": 7,
    "sep": 8, "oct": 9, "nov": 10, "dec": 11
};
class Entry {
    /** Method for transforming raw date string into one that can be used
     * with the database
     *
     * @param dateString Raw string for entry date taken from URL params
     * @returns Date string properly formatted
     */
    static parseDate(dateString) {
        const monthMap = {
            "jan": 0, "feb": 1, "mar": 2, "apr": 3,
            "may": 4, "jun": 5, "jul": 6, "aug": 7,
            "sep": 8, "oct": 9, "nov": 10, "dec": 11
        };
        if (!Number.parseInt(dateString[1])) {
            dateString = `0${dateString}`;
        }
        const day = dateString.slice(0, 2);
        const month = monthMap[dateString.slice(2, 5)];
        const year = dateString.slice(5);
        return new Date(year, month, day).toISOString().slice(0, 10);
    }
    /** Create a new entry from data, update DB, and return entry
     *
     * Throws BadRequestError if entry for that date already exists
     */
    static async create(username, entry) {
        const userCheck = await db.query(`SELECT user_id
            FROM users
            WHERE username = $1`, [username]);
        const userId = userCheck.rows[0].user_id;
        entry = { userId, ...entry };
        if (!userCheck.rows[0])
            throw new NotFoundError("User not found");
        const { snakeCols, placeholders, values } = sqlForEntryCreation(entry);
        const querySql = `
            INSERT INTO entries (${snakeCols})
            VALUES (${placeholders})
            RETURNING
                took_am_meds AS "tookAmMeds",
                took_pm_meds AS "tookPmMeds",
                stress_level AS "stressLevel",
                activity_level AS "activityLevel",
                num_drinks AS "numDrinks",
                sleep_quality AS "sleepQuality",
                comment,
                user_id AS "userId"
        `;
        const result = await db.query(querySql, values);
        return result.rows[0];
    }
    /** Retrieves an entry on the specified date
     *
     * @param username User whose entry is being returned
     * @param date Date of the entry
     * @returns Date from database or throws an error
     */
    static async get(username, date) {
        const userResult = await db.query(`SELECT user_id
            FROM users
            WHERE username = $1`, [username]);
        const userId = userResult.rows[0]['user_id'];
        if (!userId)
            throw new NotFoundError(`No user: ${username}`);
        const entryDate = Entry.parseDate(date);
        const result = await db.query(`SELECT *
            FROM entries
            WHERE user_id = $1
                AND entry_date = $2
            `, [userId, entryDate]);
        const entry = result.rows[0];
        if (!entry)
            throw new NotFoundError(`No entry for ${date}`);
        return entry;
    }
    /** Retrieves all entries a user's made */
    static async getAll(username) {
        const userResult = await db.query(`SELECT user_id
            FROM users
            WHERE username = $1`, [username]);
        const userId = userResult.rows[0]['user_id'];
        if (!userId)
            throw new NotFoundError(`No user: ${username}`);
        const result = await db.query(`SELECT *
            FROM entries
            WHERE user_id = $1
            ORDER BY entry_date
            `, [userId]);
        const entries = result.rows;
        console.log(entries);
        if (!entries[0])
            throw new NotFoundError(`No entries found`);
        return entries;
    }
    /* Retrieve the years for which there are entries */
    static async getEntryYears(username) {
        const userCheck = await db.query(`SELECT user_id
            FROM users
            WHERE username = $1`, [username]);
        const userId = userCheck.rows[0]['user_id'];
        console.log(username);
        if (!userId)
            throw new NotFoundError(`No user: ${username}`);
        const result = await db.query(`SELECT entry_date
            FROM entries
            WHERE user_id = $1;
            `, [userId]
        // `SELECT DISTINCT EXTRACT(YEAR FROM entry_date)
        // FROM entries
        // WHERE user_id = $1;
        // `,
        // [userId]
        );
        const entries = result.rows;
        if (!entries[0])
            throw new NotFoundError(`No entries found`);
        return entries;
    }
    /* Update entry */
    static async update(username, entryDate) {
    }
    /* Delete entry */
    static async delete(username, date) {
        const userCheck = await db.query(`SELECT user_id
            FROM users
            WHERE username = $1`, [username]);
        const userId = userCheck.rows[0]['user_id'];
        if (!userId) {
            if (!userId)
                throw new NotFoundError(`No user: ${username}`);
        }
        const entryDate = Entry.parseDate(date);
        console.log(userId, entryDate);
        /*
        const result = await db.query(
            `DELETE
            FROM entries
            WHERE user_id = $1
                AND entry_date = $2`,
                [userId, entryDate]
        )
        */
        const result = await db.query(`SELECT *
            FROM entries
            WHERE user_id = $1
                AND entry_date = $2`, [userId, entryDate]);
        console.log(result.rows[0]);
    }
}
module.exports = Entry;
