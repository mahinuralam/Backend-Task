const dbConfig = require("./config.js");
const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  },
  logging: false
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.Post = require("../models/Post")(sequelize, Sequelize);
db.Post_comment = require("../models/Post_comment")(sequelize, Sequelize);
db.User_post_reaction = require("../models/User_post_reaction")(sequelize, Sequelize);
db.User = require("../models/User")(sequelize, Sequelize);


module.exports = db;