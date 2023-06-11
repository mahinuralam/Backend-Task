module.exports = (sequelize, Sequelize) => {
    const Post = sequelize.define("Posts", {
      user_id: {
        type: Sequelize.INTEGER,
      },
      comment: {
        type: Sequelize.TEXT,
      },
      attachment_url: {
        type: Sequelize.STRING,
        defaultValue: "",
      },
      total_reaction: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },
      total_funny: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },
      total_love: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },
      total_care: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },
      total_angry: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },
      total_like: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },
      total_wow: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },
      total_sad: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },
    });
  
    return Post;
  };
  
  