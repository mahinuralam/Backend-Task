module.exports = (sequelize, Sequelize) => {
    const Post = sequelize.define("Posts", {
      user_id: {
        type: Sequelize.INTEGER
      },
      comment: {
        type: Sequelize.TEXT
      },
      attachment_url: {
        type: Sequelize.STRING
      },
      total_reaction: {
        type: Sequelize.INTEGER
      },  
      funny: {
        type: Sequelize.INTEGER
      },
      love: {
        type: Sequelize.INTEGER
      },
      care: {
        type: Sequelize.INTEGER
      },
      angry: {
        type: Sequelize.INTEGER
      },
      like: {
        type: Sequelize.INTEGER
      },
      wow: {
        type: Sequelize.INTEGER
      },
      sad: {
        type: Sequelize.INTEGER
      },
    });
  
    return Post;
  };
  
  