module.exports = (sequelize, Sequelize) => {
    const User_post_reaction = sequelize.define("User_post_reactions", {
      post_id: {
        type: Sequelize.INTEGER
      },
      user_id: {
        type: Sequelize.INTEGER
      },
      reaction_id: {
        type: Sequelize.INTEGER
      },
      status: {
        type: Sequelize.BOOLEAN,
        defaultValue: 0
      },
    });
  
    return User_post_reaction;
  };
  
  