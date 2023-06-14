/* Authentication related routes */

const jsonschema = require("jesonschema")
const express = require("express")

const User = require("../models/users")
const { createToken } = require("../helpers/tokens")

const router = new express.Router()

/** POST /auth/token: { username, password } => { token }
 * 
 * Returns JWT token used for auth w/ other requests
 * 
 * Auth needed: none
*/

router.post("/token")