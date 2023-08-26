const db = require('../db')

const { BadRequestError, NotFoundError } = require ('../expressError')
const { sqlForPartialUpdate } = require("../helpers/sql")

class Entry {
    /** Create a new entry from data, update DB, and return entry
     * 
     * Throws BadRequestError if entry for that date already exists
     */
    static async create({userId, ...entryInfo}){

        const userCheck = await db.query(
            `SELECT *
            FROM users
            WHERE user_id = $1`,
            [userId]
        )
        
        if (!userCheck.rows[0]) throw new NotFoundError("User not found")

        // const duplicateCheck = await db.query(
        //     `SELECT entryId
        //     FROM entries
        //     WHERE entryDate = $1`,
        //     [entryDate]
        // )

        // if (duplicateCheck.rows[0])
        //     throw new BadRequestError(`Duplicate date: ${entryDate}`)

        const { setCols, values } = sqlForPartialUpdate(entryInfo)

        const querySql = `
            INSERT INTO entries (${setCols})
            VALUES (${values})
            RETURNING
                took_am_meds AS "tookAmMeds",
                took_pm_meds AS "tookPmMeds",
                stress_level AS "stressLevel",
                activity_level AS "activityLevel",
                num_drinks AS "numDrinks",
                sleep_quality AS "sleepQuality",
                comment,
                user_id AS "userId"
        `

        const result = await db.query(querySql, )

        // const result = await db.query(
        //     `INSERT INTO entries (
        //         entry_date,
        //         took_am_meds,
        //         took_pm_meds,
        //         stress_level,
        //         activity_level,
        //         num_drinks,
        //         sleep_quality,
        //         comment,
        //         user_id
        //     )
        //     VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
        //     RETURNING
        //         took_am_meds AS "tookAmMeds",
        //         took_pm_meds AS "tookPmMeds",
        //         stress_level AS "stressLevel",
        //         activity_level AS "activityLevel",
        //         num_drinks AS "numDrinks",
        //         sleep_quality AS "sleepQuality",
        //         comment,
        //         user_id AS "userId"
        //     `,
        //     [entryDate, stressLevel, sleepQuality, activityLevel,
        //         numDrinks, numAuras, numSeizures, comments, userId]
        // )

        return result.rows[0]

    }

    /** Retrieves an entry
     * 
     * Throws NotFoundError if or user entry doesn't exist
     */

    static async get( username, entryDate ) {
        const userResult = await db.query(
            `SELECT user_id
            FROM users
            WHERE username = $1
            `,
            [username]
        )

        const userId = userResult
        
        if (!userId) throw new NotFoundError(`No user: ${username}`)
        
        const result = await db.query(
            `SELECT *
            FROM entry
            WHERE user_id = $1
                AND date = $2
            `,
            [userId, entryDate]
        )

        const entry = result.rows[0]

        if (!entry) throw new NotFoundError(`No entry for ${entryDate}`)

        return result
    }

    /** Retrieves all entries a user's made */

    static async getAll( userId ) {

    }

    static async update ( userId, entryDate) {

    }

    static async delete ( userId, entryDate) {

    }
}

module.exports = Entry