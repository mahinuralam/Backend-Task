module.exports = (sequelize, Sequelize) => {
    const Post = sequelize.define("Posts", {
      user_id: {
        type: Sequelize.INTEGER
      },
      comment: {
        type: Sequelize.TEXT
      },
      attachment_url: {
        type: Sequelize.STRING,
        defaultValue: ''
      },
      total_reaction: {
        type: Sequelize.INTEGER,
        defaultValue: 0
      },  
      funny: {
        type: Sequelize.INTEGER,
        defaultValue: 0
      },
      love: {
        type: Sequelize.INTEGER,
        defaultValue: 0
      },
      care: {
        type: Sequelize.INTEGER,
        defaultValue: 0
      },
      angry: {
        type: Sequelize.INTEGER,
        defaultValue: 0
      },
      like: {
        type: Sequelize.INTEGER,
        defaultValue: 0
      },
      wow: {
        type: Sequelize.INTEGER,
        defaultValue: 0
      },
      sad: {
        type: Sequelize.INTEGER,
        defaultValue: 0
      },
    });
  
    return Post;
  };
  
  