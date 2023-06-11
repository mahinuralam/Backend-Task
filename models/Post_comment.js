module.exports = (sequelize, Sequelize) => {
    const Post_comment = sequelize.define("Post_comments", {
      user_id: {
        type: Sequelize.INTEGER,
      },
      poster_id: {
        type: Sequelize.INTEGER,
      },
      parent_id: {
        type: Sequelize.INTEGER,
      },
      comment: {
        type: Sequelize.TEXT,
      },
    });
  
    return Post_comment;
  };
  
  