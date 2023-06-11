const asyncWrapper = require("../middleware/async");
const db = require("../database/connection");
const helper = require("../helpers/posts");
const enums = require("./enums");
const { literal } = require("sequelize");
const Post = db.Post;
const Post_comment = db.Post_comment;
const User_post_reaction = db.User_post_reaction;

const createPost = async (req, res, next) => {
  const saveFile = helper.saveFile;
  const filePath = await saveFile(req.file);
  if (!filePath) {
    return next(createCustomError(`No Post available`, 404));
  }
  const fileName = req.file.originalname;
  const modifiedFileName = fileName.replace(/\s/g, "_"); // Replace spaces with underscores
  req.body.attachment_url = "http://localhost:3000/uploads/" + modifiedFileName;
  const post = await Post.create(req.body);
  if (!post) {
    return next(createCustomError(`No Post available`, 404));
  }
  res.status(200).json({ post });
};

const getAllPosts = asyncWrapper(async (req, res, next) => {
  const { page, limit } = req.query; // Get the page number and limit from the query parameters

  const offset = (page - 1) * limit; // Calculate the offset based on the page number and limit


  Post.hasMany(Post_comment, { foreignKey: "poster_id" });

  const post = await Post.findAll({
    include: [
      {
        model: Post_comment,
      },
    ],
    limit,
    offset,
  });
  const totalCount = await Post.count();

  // Calculate the total page count
  const totalPages = Math.ceil(totalCount / limit);

  if (!post) {
    return next(createCustomError(`No Post available`, 404));
  }
  res.status(200).json({ post, total_page: totalPages });
});

const getPost = asyncWrapper(async (req, res, next) => {
  const id = req.params.id;
  const post = await Post.findByPk(id);
  if (!post) {
    return next(createCustomError(`No Post with id : ${id}`, 404));
  }
  res.status(200).json({ post });
});

const updatePost = asyncWrapper(async (req, res, next) => {
  const id = req.params.id;
  const post = await Post.update(req.body, { where: { id: id } });
  if (!post) {
    return next(createCustomError(`No Post with id : ${id}`, 404));
  }
  res.status(200).json({ post });
});

const deletePost = asyncWrapper(async (req, res, next) => {
  const id = req.params.id;
  const post = await Post.destroy({ where: { id: id } });
  if (!post) {
    return next(createCustomError(`No Post with id : ${id}`, 404));
  }
  res.status(200).json({ post });
});

const postComment = asyncWrapper(async (req, res, next) => {
  const post_comment = await Post_comment.create(req.body);
  res.status(200).json({ post_comment });
});

const userPostReaction = asyncWrapper(async (req, res, next) => {
  const { user_id, post_id } = req.body;
  const reactionStatus = helper.reactStatus;
  // Check if there is already a user_post_reaction with user_id
  let user_post_reaction = await User_post_reaction.findOne({
    where: { user_id: user_id, post_id: post_id },
  });
  //if does reaction does not exist create reaction
  if (!user_post_reaction) {
    await User_post_reaction.create(req.body);
    if (req.body.reaction_id == 1) {
      await Post.update(
        {
          total_funny: literal("total_funny + 1"),
          total_reaction: literal("total_reaction + 1"),
        },
        {
          where: {
            id: req.body.post_id,
          },
        }
      )
        .then((result) => {
          console.log(`${result} post(s) updated successfully.`);
        })
        .catch((error) => {
          console.error("Error updating posts:", error);
        });
    }
    if (req.body.reaction_id == 2) {
      await Post.update(
        {
          total_love: literal("total_love + 1"),
          total_reaction: literal("total_reaction + 1"),
        },
        {
          where: {
            id: req.body.post_id,
          },
        }
      )
        .then((result) => {
          console.log(`${result} post(s) updated successfully.`);
        })
        .catch((error) => {
          console.error("Error updating posts:", error);
        });
    }
    if (req.body.reaction_id == 3) {
      await Post.update(
        {
          total_care: literal("total_care + 1"),
          total_reaction: literal("total_reaction + 1"),
        },
        {
          where: {
            id: req.body.post_id,
          },
        }
      )
        .then((result) => {
          console.log(`${result} post(s) updated successfully.`);
        })
        .catch((error) => {
          console.error("Error updating posts:", error);
        });
    }
    if (req.body.reaction_id == 4) {
      await Post.update(
        {
          total_angry: literal("total_angry + 1"),
          total_reaction: literal("total_reaction + 1"),
        },
        {
          where: {
            id: req.body.post_id,
          },
        }
      )
        .then((result) => {
          console.log(`${result} post(s) updated successfully.`);
        })
        .catch((error) => {
          console.error("Error updating posts:", error);
        });
    }
    if (req.body.reaction_id == 5) {
      await Post.update(
        {
          total_like: literal("total_like + 1"),
          total_reaction: literal("total_reaction + 1"),
        },
        {
          where: {
            id: req.body.post_id,
          },
        }
      )
        .then((result) => {
          console.log(`${result} post(s) updated successfully.`);
        })
        .catch((error) => {
          console.error("Error updating posts:", error);
        });
    }
    if (req.body.reaction_id == 6) {
      await Post.update(
        {
          total_wow: literal("total_wow + 1"),
          total_reaction: literal("total_reaction + 1"),
        },
        {
          where: {
            post_id: req.body.post_id,
            user_id: req.body.user_id,
          },
        }
      )
        .then((result) => {
          console.log(`${result} post(s) updated successfully.`);
        })
        .catch((error) => {
          console.error("Error updating posts:", error);
        });
    }
    if (req.body.reaction_id == 7) {
      await Post.update(
        {
          total_sad: literal("total_sad + 1"),
          total_reaction: literal("total_reaction + 1"),
        },
        {
          where: {
            post_id: req.body.post_id,
            user_id: req.body.user_id,
          },
        }
      )
        .then((result) => {
          console.log(`${result} post(s) updated successfully.`);
        })
        .catch((error) => {
          console.error("Error updating posts:", error);
        });
    }
  }
  //if reaction exist & user send same reaction
  if (user_post_reaction) {
    if (user_post_reaction.dataValues.status == false) {
      //update status to true
      //inciment react & total count
      if (req.body.reaction_id == 1) {
        await Post.update(
          {
            total_funny: literal("total_funny + 1"),
            total_reaction: literal("total_reaction + 1"),
          },
          {
            where: {
              id: req.body.post_id,
            },
          }
        )
          .then((result) => {
            console.log(`${result} post(s) updated successfully.`);
          })
          .catch((error) => {
            console.error("Error updating posts:", error);
          });
      }
      if (req.body.reaction_id == 2) {
        await Post.update(
          {
            total_love: literal("total_love + 1"),
            total_reaction: literal("total_reaction + 1"),
          },
          {
            where: {
              id: req.body.post_id,
            },
          }
        )
          .then((result) => {
            console.log(`${result} post(s) updated successfully.`);
          })
          .catch((error) => {
            console.error("Error updating posts:", error);
          });
      }
      if (req.body.reaction_id == 3) {
        await Post.update(
          {
            total_care: literal("total_care + 1"),
            total_reaction: literal("total_reaction + 1"),
          },
          {
            where: {
              id: req.body.post_id,
            },
          }
        )
          .then((result) => {
            console.log(`${result} post(s) updated successfully.`);
          })
          .catch((error) => {
            console.error("Error updating posts:", error);
          });
      }
      if (req.body.reaction_id == 4) {
        await Post.update(
          {
            total_angry: literal("total_angry + 1"),
            total_reaction: literal("total_reaction + 1"),
          },
          {
            where: {
              id: req.body.post_id,
            },
          }
        )
          .then((result) => {
            console.log(`${result} post(s) updated successfully.`);
          })
          .catch((error) => {
            console.error("Error updating posts:", error);
          });
      }
      if (req.body.reaction_id == 5) {
        await Post.update(
          {
            total_like: literal("total_like + 1"),
            total_reaction: literal("total_reaction + 1"),
          },
          {
            where: {
              id: req.body.post_id,
            },
          }
        )
          .then((result) => {
            console.log(`${result} post(s) updated successfully.`);
          })
          .catch((error) => {
            console.error("Error updating posts:", error);
          });
      }
      if (req.body.reaction_id == 6) {
        await Post.update(
          {
            total_wow: literal("total_wow + 1"),
            total_reaction: literal("total_reaction + 1"),
          },
          {
            where: {
              id: req.body.post_id,
            },
          }
        )
          .then((result) => {
            console.log(`${result} post(s) updated successfully.`);
          })
          .catch((error) => {
            console.error("Error updating posts:", error);
          });
      }
      if (req.body.reaction_id == 7) {
        await Post.update(
          {
            total_sad: literal("total_sad + 1"),
            total_reaction: literal("total_reaction + 1"),
          },
          {
            where: {
              id: req.body.post_id,
            },
          }
        )
          .then((result) => {
            console.log(`${result} post(s) updated successfully.`);
          })
          .catch((error) => {
            console.error("Error updating posts:", error);
          });
      }
      await User_post_reaction.update(
        {
          status: true,
          reaction_id: req.body.reaction_id,
        },
        {
          where: {
            user_id: req.body.user_id,
            post_id: req.body.post_id,
          },
        }
      );
    } else if (
      user_post_reaction.dataValues.reaction_id == req.body.reaction_id
    ) {
      //deduct totalcount & deducet react count & change status to false
      if (req.body.reaction_id == 1) {
        await Post.update(
          {
            total_funny: literal("total_funny - 1"),
            total_reaction: literal("total_reaction - 1"),
          },
          {
            where: {
              id: req.body.post_id,
            },
          }
        )
          .then((result) => {
            console.log(`${result} post(s) updated successfully.`);
          })
          .catch((error) => {
            console.error("Error updating posts:", error);
          });
      }
      if (req.body.reaction_id == 2) {
        await Post.update(
          {
            total_love: literal("total_love - 1"),
            total_reaction: literal("total_reaction - 1"),
          },
          {
            where: {
              id: req.body.post_id,
            },
          }
        )
          .then((result) => {
            console.log(`${result} post(s) updated successfully.`);
          })
          .catch((error) => {
            console.error("Error updating posts:", error);
          });
      }
      if (req.body.reaction_id == 3) {
        await Post.update(
          {
            total_care: literal("total_care - 1"),
            total_reaction: literal("total_reaction - 1"),
          },
          {
            where: {
              id: req.body.post_id,
            },
          }
        )
          .then((result) => {
            console.log(`${result} post(s) updated successfully.`);
          })
          .catch((error) => {
            console.error("Error updating posts:", error);
          });
      }
      if (req.body.reaction_id == 4) {
        await Post.update(
          {
            total_angry: literal("total_angry - 1"),
            total_reaction: literal("total_reaction - 1"),
          },
          {
            where: {
              id: req.body.post_id,
            },
          }
        )
          .then((result) => {
            console.log(`${result} post(s) updated successfully.`);
          })
          .catch((error) => {
            console.error("Error updating posts:", error);
          });
      }
      if (req.body.reaction_id == 5) {
        await Post.update(
          {
            total_like: literal("total_like - 1"),
            total_reaction: literal("total_reaction - 1"),
          },
          {
            where: {
              id: req.body.post_id,
            },
          }
        )
          .then((result) => {
            console.log(`${result} post(s) updated successfully.`);
          })
          .catch((error) => {
            console.error("Error updating posts:", error);
          });
      }
      if (req.body.reaction_id == 6) {
        await Post.update(
          {
            total_wow: literal("total_wow - 1"),
            total_reaction: literal("total_reaction - 1"),
          },
          {
            where: {
              id: req.body.post_id,
            },
          }
        )
          .then((result) => {
            console.log(`${result} post(s) updated successfully.`);
          })
          .catch((error) => {
            console.error("Error updating posts:", error);
          });
      }
      if (req.body.reaction_id == 7) {
        await Post.update(
          {
            total_sad: literal("total_sad - 1"),
            total_reaction: literal("total_reaction - 1"),
          },
          {
            where: {
              id: req.body.post_id,
            },
          }
        )
          .then((result) => {
            console.log(`${result} post(s) updated successfully.`);
          })
          .catch((error) => {
            console.error("Error updating posts:", error);
          });
      }
      await User_post_reaction.update(
        {
          status: false,
        },
        {
          where: {
            user_id: req.body.user_id,
            post_id: req.body.post_id,
          },
        }
      );
    } else {
      //if does not match
      //decrement previous react count
      if (user_post_reaction.dataValues.reaction_id == 1) {
        await Post.update(
          {
            total_funny: literal("total_funny - 1"),
          },
          {
            where: {
              id: req.body.post_id,
            },
          }
        )
          .then((result) => {
            console.log(`${result} post(s) updated successfully.`);
          })
          .catch((error) => {
            console.error("Error updating posts:", error);
          });
      } else if (user_post_reaction.dataValues.reaction_id == 2) {
        await Post.update(
          {
            total_love: literal("total_love - 1"),
          },
          {
            where: {
              id: req.body.post_id,
            },
          }
        )
          .then((result) => {
            console.log(`${result} post(s) updated successfully.`);
          })
          .catch((error) => {
            console.error("Error updating posts:", error);
          });
      } else if (user_post_reaction.dataValues.reaction_id == 3) {
        await Post.update(
          {
            total_care: literal("total_care - 1"),
          },
          {
            where: {
              id: req.body.post_id,
            },
          }
        )
          .then((result) => {
            console.log(`${result} post(s) updated successfully.`);
          })
          .catch((error) => {
            console.error("Error updating posts:", error);
          });
      } else if (user_post_reaction.dataValues.reaction_id == 4) {
        await Post.update(
          {
            total_angry: literal("total_angry - 1"),
          },
          {
            where: {
              id: req.body.post_id,
            },
          }
        )
          .then((result) => {
            console.log(`${result} post(s) updated successfully.`);
          })
          .catch((error) => {
            console.error("Error updating posts:", error);
          });
      } else if (user_post_reaction.dataValues.reaction_id == 5) {
        await Post.update(
          {
            total_like: literal("total_like - 1"),
          },
          {
            where: {
              id: req.body.post_id,
            },
          }
        )
          .then((result) => {
            console.log(`${result} post(s) updated successfully.`);
          })
          .catch((error) => {
            console.error("Error updating posts:", error);
          });
      } else if (user_post_reaction.dataValues.reaction_id == 6) {
        await Post.update(
          {
            total_wow: literal("total_wow - 1"),
          },
          {
            where: {
              id: req.body.post_id,
            },
          }
        )
          .then((result) => {
            console.log(`${result} post(s) updated successfully.`);
          })
          .catch((error) => {
            console.error("Error updating posts:", error);
          });
      } else if (user_post_reaction.dataValues.reaction_id == 7) {
        await Post.update(
          {
            total_sad: literal("total_sad - 1"),
          },
          {
            where: {
              id: req.body.post_id,
            },
          }
        )
          .then((result) => {
            console.log(`${result} post(s) updated successfully.`);
          })
          .catch((error) => {
            console.error("Error updating posts:", error);
          });
      }

      
      if (req.body.reaction_id == 1) {
        await Post.update(
          {
            total_funny: literal("total_funny + 1"),
          },
          {
            where: {
              id: req.body.post_id,
            },
          }
        )
          .then((result) => {
            console.log(`${result} post(s) updated successfully.`);
          })
          .catch((error) => {
            console.error("Error updating posts:", error);
          });
      } else if (req.body.reaction_id == 2) {
        await Post.update(
          {
            total_love: literal("total_love + 1"),
          },
          {
            where: {
              id: req.body.post_id,
            },
          }
        )
          .then((result) => {
            console.log(`${result} post(s) updated successfully.`);
          })
          .catch((error) => {
            console.error("Error updating posts:", error);
          });
      } else if (req.body.reaction_id == 3) {
        await Post.update(
          {
            total_care: literal("total_care + 1"),
          },
          {
            where: {
              id: req.body.post_id,
            },
          }
        )
          .then((result) => {
            console.log(`${result} post(s) updated successfully.`);
          })
          .catch((error) => {
            console.error("Error updating posts:", error);
          });
      } else if (req.body.reaction_id == 4) {
        await Post.update(
          {
            total_angry: literal("total_angry + 1"),
          },
          {
            where: {
              id: req.body.post_id,
            },
          }
        )
          .then((result) => {
            console.log(`${result} post(s) updated successfully.`);
          })
          .catch((error) => {
            console.error("Error updating posts:", error);
          });
      } else if (req.body.reaction_id == 5) {
        await Post.update(
          {
            total_like: literal("total_like + 1"),
          },
          {
            where: {
              id: req.body.post_id,
            },
          }
        )
          .then((result) => {
            console.log(`${result} post(s) updated successfully.`);
          })
          .catch((error) => {
            console.error("Error updating posts:", error);
          });
      } else if (req.body.reaction_id == 6) {
        await Post.update(
          {
            total_wow: literal("total_wow + 1"),
          },
          {
            where: {
              id: req.body.post_id,
            },
          }
        )
          .then((result) => {
            console.log(`${result} post(s) updated successfully.`);
          })
          .catch((error) => {
            console.error("Error updating posts:", error);
          });
      } else if (req.body.reaction_id == 7) {
        await Post.update(
          {
            total_sad: literal("total_sad + 1"),
          },
          {
            where: {
              id: req.body.post_id,
            },
          }
        )
          .then((result) => {
            console.log(`${result} post(s) updated successfully.`);
          })
          .catch((error) => {
            console.error("Error updating posts:", error);
          });
      }
      await User_post_reaction.update(
        {
          reaction_id: req.body.reaction_id,
        },
        {
          where: {
            user_id: req.body.user_id,
            post_id: req.body.post_id,
          },
        }
      );
    }
  }
  res.status(200).json({ user_post_reaction });
});

module.exports = {
  getAllPosts,
  getPost,
  createPost,
  deletePost,
  updatePost,
  postComment,
  userPostReaction,
};
