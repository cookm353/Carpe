/** Common config for message.ly */
// Reads .env files and make environmental variables
require("dotenv").config();
const DB_URI = (process.env.NODE_ENV === "test")
    ? "postgresql:///carpe_test"
    : "postgresql:///carpe";
const SECRET_KEY = process.env.SECRET_KEY || "secret";
const BCRYPT_WORK_FACTOR = 12;
const PORT = process.env.PORT || 3001;
module.exports = {
    DB_URI,
    SECRET_KEY,
    BCRYPT_WORK_FACTOR,
    PORT
};
