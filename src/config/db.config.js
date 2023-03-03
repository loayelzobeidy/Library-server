console.log(process.env.MYSQLDB_HOST,
  process.env.MYSQLDB_USER,
   process.env.MYSQLDB_ROOT_PASSWORD,
 process.env.MYSQLDB_DATABASE)
module.exports = {
  HOST: process.env.MYSQLDB_HOST,
  USER: process.env.MYSQLDB_USER,
  PASSWORD: process.env.MYSQLDB_ROOT_PASSWORD,
  DB: process.env.MYSQLDB_DATABASE,
  dialect: "mysql",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
  };
  
  