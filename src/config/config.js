const dotenv = require("dotenv").config({ path: __dirname + "/./../../.env" });

module.exports = {
  TOKEN: process.env.token,
  CLIENT_ID: process.env.clientId,
  GUILD_ID: process.env.guildId,
  PREFIX: process.env.prefix,
  OWNER: process.env.owner,
};
