const db = require('../db')

const { BadRequestError, NotFoundError } = require ('../expressError')
const { sqlForPartialUpdate, sqlForEntryCreation } = require("../helpers/sql")

const date = new Date()
const today = date.toISOString().slice(0, 10)

class Entry {
    tookAmMeds: boolean
    tookPmMeds: boolean
    stressLevel: Number
    activityLevel: Number
    numDrinks: Number
    sleepQuality: Number
    comment: String
    userId: Number
    entryDate: String
    numSeizures: Number
    numAuras: Number

    constructor(
        numSeizures: Number,
        numAuras: Number,
        stressLevel: Number,
        activityLevel: Number,
        numDrinks: Number,
        sleepQuality: Number,
        userId: Number,
        tookAmMeds?: boolean,
        tookPmMeds?: boolean,
        comment?: String,
        entryDate?: String
    ) {
        this.stressLevel = stressLevel
        this.activityLevel = activityLevel
        this.numDrinks = numDrinks
        this.sleepQuality = sleepQuality
        this.userId = userId
        this.numSeizures = numSeizures
        this.numAuras = numAuras
        this.tookAmMeds = tookAmMeds ? tookAmMeds : null
        this.tookPmMeds = tookPmMeds ? tookPmMeds : null
        this.comment = comment ? comment : ""
        this.entryDate = entryDate ? entryDate : today
    }

    /** Create a new entry from data, update DB, and return entry
     * 
     * Throws BadRequestError if entry for that date already exists
     */

    static async create(username: string, entry): Promise<Entry>{        
        const userCheck = await db.query(
            `SELECT user_id
            FROM users
            WHERE username = $1`,
            [username]
        )

        const userId = userCheck.rows[0].user_id
        entry = {userId, ...entry}
        
        if (!userCheck.rows[0]) throw new NotFoundError("User not found")

        const {snakeCols, placeholders, values} = sqlForEntryCreation(entry)

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
        `
        const result = await db.query(querySql, values)

        return result.rows[0]

    }

    /** Retrieves an entry
     * 
     * Throws NotFoundError if or user entry doesn't exist
     */

    static async get( username: String, entryDate: String=today ) {
        
        const userResult = await db.query(
            `SELECT user_id
            FROM users
            WHERE username = $1`,
            [username]
        )

        const userId = userResult.rows[0]['user_id']
        
        if (!userId) throw new NotFoundError(`No user: ${username}`)
        
        const result = await db.query(
            `SELECT *
            FROM entry
            WHERE user_id = $1
                AND entry_date = $2
            `,
            [userId, entryDate]
        )

        const entry = result.rows[0]

        if (!entry) throw new NotFoundError(`No entry for ${entryDate}`)

        return entry
    }

    /** Retrieves all entries a user's made */

    static async getAll( username: string ) {
        const userResult = await db.query(
            `SELECT user_id
            FROM users
            WHERE username = $1`,
            [username]
        )

        const userId = userResult.rows[0]['user_id']
        
        if (!userId) throw new NotFoundError(`No user: ${username}`)
        
        const result = await db.query(
            `SELECT *
            FROM entry
            WHERE user_id = $1
            `,
            [userId]
        )

        const entry = result.rows[0]

        if (!entry) throw new NotFoundError(`No entries found`)

        return entry
    }

    static async update ( userId, entryDate: Date) {

    }

    static async delete ( userId, entryDate) {

    }
}

module.exports = Entry