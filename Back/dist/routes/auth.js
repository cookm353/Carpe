/* Authentication related routes */
const jsonschema = require("jsonschema");
const express = require("express");
const User = require("../models/users");
const { createToken } = require("../helpers/tokens");
const userAuthSchema = require("../../schemas/userAuth.json");
const userRegisterSchema = require("../../schemas/userRegister.json");
const { BadRequestError } = require("../expressError");
const router = new express.Router();
/** POST /auth/token: { username, password } => { token }
 *
 * Returns JWT token used for auth w/ other requests
 *
 * Auth needed: none
*/
router.post("/token", async (req, res, next) => {
    try {
        const validator = jsonschema.validate(req.body, userAuthSchema);
        if (!validator.valid) {
            const errs = validator.errors.map(e => e.stack);
            throw new BadRequestError(errs);
        }
        const { username, password } = req.body;
        const user = await User.authenticate(username, password);
        const token = createToken(user);
        console.log("JWT token sent");
        return res.json({ token });
    }
    catch (err) {
        return next(err);
    }
});
/** POST /auth/register: { user } => { token }
 *
 * User must include { username, password, firstName, email}
 *
 * Returns JWT that can be to authenticate other requests
 *
 * Auth required: none
*/
router.post("/register", async (req, res, next) => {
    try {
        const validator = jsonschema.validate(req.body, userRegisterSchema);
        if (!validator.valid) {
            const errs = validator.errors.map(e => e.stack);
            throw new BadRequestError(errs);
        }
        const newUser = await User.register({ ...req.body, isAdmin: false });
        const token = createToken(newUser);
        console.log("New user registered");
        return res.status(201).json({ token });
    }
    catch (err) {
        return next(err);
    }
});
module.exports = router;
