require("dotenv").config();

module.exports = {
  PORT: process.env.PORT || 5000,
  mongodb_uri: process.env.MONGODB_URI,
};
