module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define("Users", {
    name: {
      type: Sequelize.STRING
    },
    password: {
      type: Sequelize.STRING
    },
  });

  return User;
};

