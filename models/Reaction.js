module.exports = (sequelize, Sequelize) => {
    const Reaction = sequelize.define("Reactions", {
      user_id: {
        type: Sequelize.INTEGER
      },
      post_id: {
        type: Sequelize.INTEGER
      },
      funny: {
        type: Sequelize.INTEGER
      },
    });
    return Reaction;
  };
  
  