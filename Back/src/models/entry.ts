const db = require('../db')
const { BadRequestError, NotFoundError } = require ('../expressError')

class Entry {
    /** Create a new entry from data, update DB, and return entry
     * 
     * Throws BadRequestError if entry for that date already exists
     */
    static async create( 
            { entryDate, stressLevel, sleepQuality, activityLevel,
            numDrinks, numAuras, numSeizures, comments, userId } 
        ) {
        const duplicateCheck = await db.query(
            `SELECT entryId
            FROM entries
            WHERE entryDate = $1`,
            [entryDate]
        )

        if (duplicateCheck.rows[0])
            throw new BadRequestError(`Duplicate date: ${entryDate}`)

        
        

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