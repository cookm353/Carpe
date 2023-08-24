process.env.NODE_ENV = "test"

const { sqlForPartialUpdate } = require("../dist/helpers/sql")
const { BadRequestError } = require("../dist/expressError")

describe("Object to SQL converter", () => {
    it("throws type error if no arguments passed", () => {
        const result = () => sqlForPartialUpdate()
        expect(result).toThrow(TypeError)
        
        try {
            sqlForPartialUpdate()
        } catch (err) {
            expect(err.message).toBe("Cannot convert undefined or null to object")
        }
    })
    
    it("throws bad request error if empty object", () => {
        const result = () => sqlForPartialUpdate({})
        expect(result).toThrow(BadRequestError)
        
        try {
            sqlForPartialUpdate({})
        } catch (err) {
            expect(err.message).toBe("No data")
        }
    })

    it("returns keys", () => {
        const dataToUpdate = {
            firstName: "Alice",
            age: 2
        }
        const colNames = ["firstName", "age"]

        const result = sqlForPartialUpdate(dataToUpdate, colNames)

        expect(result.values).toEqual(['Alice', 2])
        expect(result.setCols).toBe(`"first_name"=$1, "age"=$2`)
    })
})