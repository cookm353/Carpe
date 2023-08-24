const { BadRequestError } = require('../expressError')

/** Function to convert from camelCase to snake_case */
const toSnakeCase = (word) => {
    let newWord = ""

    for (let char of word) {
        if (char.toUpperCase() === char) {
            let newChar = `_${char.toLowerCase()}`
            newWord += newChar
        } else {
            newWord += char
        }
    }

    return newWord
}

/** Converts JS objects holding data to update for a row to
 * SQL.
 * 
 * dataToUpdate should be an object holding updated values
 * as values, jsToSql should be an object holding the
 * names of the columns as values
 * 
 * 
 */

const sqlForPartialUpdate = (dataToUpdate: Object): Object => {
    const keys = Object.keys(dataToUpdate)

    if (keys.length === 0) throw new BadRequestError("No data")

    // {firstName: "Alice", age: 29} => ['"first_name"=%1`, `"age"=$2`]    
    const cols = keys.map((colName, idx) => {
        colName = toSnakeCase(colName)
        return `"${colName || colName}"=$${idx + 1}`
    })

    return {
        setCols: cols.join(', '),
        values: Object.values(dataToUpdate)
    }
}

module.exports = {sqlForPartialUpdate}