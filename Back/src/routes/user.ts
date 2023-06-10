/* User class */
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")

const db = require("../db")
const ExpressError = require("../expressError")
const { BCRYPT_WORK_FACTOR } = require("../config")