const db = require("../../config_env/db.config.json")
module.exports = {
    HOST: db.HOST,
    USER: db.USER,
    PASSWORD: db.PASSWORD,
    DB: db.DB,
    dialect: db.dialect,
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  };
  
  