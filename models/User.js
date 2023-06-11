const { required } = require("nodemon/lib/config");

module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define("Users", {
    name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false,
    },
  });

  return User;
};

