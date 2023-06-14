const db = require('../db')
const { BadRequestError, NotFoundError } = require ('../expressError')

class Entry {
    entryDate
    stressLevel
    sleepQuality
    activityLevel

    constructor(
        entryDate, stressLevel, sleepQuality, activityLevel
    ) {
        this.entryDate = entryDate
    }

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
     * Throws NotFoundError if entry doesn't exist
     */

    static async get( userId, entryDate ) {

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