const dbConfig = require("../config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: false,

  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;


db.book = require("./book.model.js")(sequelize, Sequelize);
db.shelf = require("./shelf.model.js")(sequelize, Sequelize);
db.user = require("./user.model.js")(sequelize, Sequelize);
db.role = require("./role.model.js")(sequelize, Sequelize);

db.role.belongsToMany(db.user, {
  through: "user_roles",
  foreignKey: "roleId",
  otherKey: "userId"
});

// db.shelf.belongsToMany(db.book, {
//   through: "shelfs_books",
//   foreignKey: "shelfId",
//   otherKey: "bookId"
// });

db.user.belongsToMany(db.role, {
  through: "user_roles",
  foreignKey: "userId",
  otherKey: "roleId"
});
db.role.create({
  id: 1,
  name: "user"
});

db.role.create({
  id: 2,
  name: "moderator"
});

db.role.create({
  id: 3,
  name: "admin"
});
db.ROLES = ["user", "admin", "moderator"];  
module.exports = db