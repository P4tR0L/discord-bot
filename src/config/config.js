const dotenv = require("dotenv").config({ path: __dirname + "/./../../.env" })

module.exports = {
    TOKEN: process.env.token,
    PREFIX: process.env.prefix,
    OWNER: process.env.owner,
  }