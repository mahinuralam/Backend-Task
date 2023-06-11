const { required } = require("nodemon/lib/config");

module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define("Users", {
    name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    email: {
      type: Sequelize.STRING,
      unique: true,
      isEmail: true, //checks for email format
      allowNull: false,
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false,
    },
  });

  return User;
};

