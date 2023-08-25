const express = require('express')
const cors = require("cors")

const { NotFoundError } = require("./expressError")

const authRoutes = require("./routes/auth")
const userRoutes = require("./routes/user")
const entryRoutes = require("./routes/entry")
const { authenticateJWT } = require("./middleware/auth")

const morgan = require("morgan")

const app = express()

app.use(cors())
app.use(express.json())
app.use(morgan('tiny'))
app.use(authenticateJWT)

app.use("/auth", authRoutes)
// app.use("/entry", entryRoutes)
app.use("/user", userRoutes)

// Handle 404 errors
app.use((req, resp, next) => {
    return next(new NotFoundError)
})

// Generic error handler
app.use((err, req, resp, next) => {
    if (process.env.NODE_ENV !== "test") console.log(err.stack)
    const status = err.status || 500
    const message = err.message

    return resp.status(status).json({
        error: { message, status}
    })
})

module.exports = app