const asyncWrapper = require("../middleware/async");
const db = require("../database/connection");
const helper = require("../helpers/posts");
const enums = require("./enums");
const Post = db.Post;
const Post_comment = db.Post_comment;
const User_post_reaction = db.User_post_reaction;


const createPost = async (req, res, next) => {
  console.log("req", req.file);
  const saveFile = helper.saveFile
  const filePath = await saveFile(req.file);
  if (!filePath) {
    return next(createCustomError(`No Post available`, 404));
  }
  const fileName = req.file.originalname;
  const modifiedFileName = fileName.replace(/\s/g, "_"); // Replace spaces with underscores
  console.log("File saved at:", filePath);
  req.body.attachment_url = "http://localhost:3000/uploads/" + modifiedFileName;
  const post = await Post.create(req.body);
  if (!post) {
    return next(createCustomError(`No Post available`, 404));
  }
  res.status(200).json({ post });
};


const getAllPosts = asyncWrapper(async (req, res, next) => {
  // console.log(req.query)
  const { page, limit } = req.query; // Get the page number and limit from the query parameters

  const offset = (page - 1) * limit; // Calculate the offset based on the page number and limit

  console.log("GET ALL POST");

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
  console.log("GET POST");
  const id = req.params.id;
  const post = await Post.findByPk(id);
  if (!post) {
    return next(createCustomError(`No Post with id : ${id}`, 404));
  }
  res.status(200).json({ post });
});


const updatePost = asyncWrapper(async (req, res, next) => {
  console.log("UPDATE POST");
  const id = req.params.id;
  const post = await Post.update(req.body, { where: { id: id } });
  if (!post) {
    return next(createCustomError(`No Post with id : ${id}`, 404));
  }
  res.status(200).json({ post });
});

const deletePost = asyncWrapper(async (req, res, next) => {
  console.log("DELETE POST");
  const id = req.params.id;
  const post = await Post.destroy({ where: { id: id } });
  if (!post) {
    return next(createCustomError(`No Post with id : ${id}`, 404));
  }
  res.status(200).json({ post });
});


const postComment = asyncWrapper(async (req, res, next) => {
  console.log("POST COMMENT");
  const post_comment = await Post_comment.create(req.body);
  res.status(200).json({ post_comment });
});


const userPostReaction = asyncWrapper(async (req, res, next) => {
  console.log("USER POST REACTION");
  const { user_id, post_id } = req.body;
  console.log(" IDS ", user_id, post_id);
  const reactionStatus = helper.reactStatus;
  // Check if there is already a user_post_reaction with user_id
  let user_post_reaction = await User_post_reaction.findOne({
    where: { user_id: user_id, post_id: post_id },
  });

  const id = post_id;
  const post = await Post.findByPk(id);
  if (!post) {
    return next(createCustomError(`No Post with id : ${id}`, 404));
  }

  if (!user_post_reaction) {
    //   User_post_reaction doesn't exist, create a new one
    console.log(" NAIIIII ");
    let user_post_reaction = await User_post_reaction.create(req.body);
    let reaction_id = user_post_reaction.reaction_id;
    let status = user_post_reaction.status;
    let prev_react = "";
    for (const [key, value] of Object.entries(enums.ReactionEnum)) {
      if (value === reaction_id) {
        curr_react = key;
        break;
      }
    }

    if (status === 0) {
      console.log(" prev_react ", curr_react);
      if (curr_react === "love") {
        post.total_love += 1;
        console.log(" post love ", post.love);
      } else if (curr_react === "funny") {
        post.total_funny += 1;
        console.log(" post funny ", post.funny);
      } else if (curr_react === "like") {
        post.total_like += 1;
        console.log(" post like ", post.like);
      } else if (curr_react === "care") {
        post.total_care += 1;
        console.log(" post care ", post.care);
      } else if (curr_react === "wow") {
        post.total_wow += 1;
        console.log(" post wow ", post.wow);
      } else if (curr_react === "angry") {
        post.total_angry += 1;
        console.log(" post angry ", post.angry);
      } else if (curr_react === "sad") {
        post.total_sad += 1;
        console.log(" post sad ", post.sad);
      }
    } else {
      console.log(" prev_react ", prev_react);
      console.log(" curr_react ", curr_react);

      if (curr_react === "love") {
        post.total_love += 1;
        console.log(" post love ", post.love);
      } else if (curr_react === "funny") {
        post.total_funny += 1;
        console.log(" post funny ", post.funny);
      } else if (curr_react === "like") {
        post.total_like += 1;
        console.log(" post like ", post.like);
      } else if (curr_react === "care") {
        post.total_care += 1;
        console.log(" post care ", post.care);
      } else if (curr_react === "wow") {
        post.total_wow += 1;
        console.log(" post wow ", post.wow);
      } else if (curr_react === "angry") {
        post.total_angry += 1;
        console.log(" post angry ", post.angry);
      } else if (curr_react === "sad") {
        post.total_sad += 1;
        console.log(" post sad ", post.sad);
      }

      if (prev_react === "love") {
        post.total_love -= 1;
        console.log(" post love ", post.love);
      } else if (prev_react === "funny") {
        post.total_funny -= 1;
        console.log(" post funny ", post.funny);
      } else if (prev_react === "like") {
        post.total_like -= 1;
        console.log(" post like ", post.like);
      } else if (prev_react === "care") {
        post.total_care -= 1;
        console.log(" post care ", post.care);
      } else if (prev_react === "wow") {
        post.total_wow -= 1;
        console.log(" post wow ", post.wow);
      } else if (prev_react === "angry") {
        post.total_angry -= 1;
        console.log(" post angry ", post.angry);
      } else if (prev_react === "sad") {
        post.total_sad -= 1;
        console.log(" post sad ", post.sad);
      }
    }

    post.total_reaction =
      post.love +
      post.care +
      post.funny +
      post.sad +
      post.angry +
      post.like +
      post.wow;

    console.log(" total reaction ", post.total_reaction);

    user_post_reaction.status = true;
    await post.save();
    await user_post_reaction.save();
    console.log(" REACT count ", post.total_reaction);
    res.status(200).json({ user_post_reaction });
    return;
  }

  console.log(" ASEEEEEE ");


  var cur_reaction_id = req.body.reaction_id;
  var prev_rection_id = user_post_reaction.reaction_id;
  var prev_react = "", curr_react = "";
  var status = user_post_reaction.status;

  
  for (const [key, value] of Object.entries(enums.ReactionEnum)) {
    if (value === cur_reaction_id) {
      curr_react = key;
      console.log(" curr_react ", curr_react);
      break;
    }
  }

  for (const [key, value] of Object.entries(enums.ReactionEnum)) {
    if (value === prev_rection_id) {
      prev_react = key;
      console.log(" prev_react ", prev_react);
      break;
    }
  }

  if (status === 0) {
    console.log(" prev_react innnn ", curr_react);
    if (curr_react === "love") {
      post.total_love += 1;
      console.log(" post love ", post.love);
    } else if (curr_react === "funny") {
      post.total_funny += 1;
      console.log(" post funny ", post.funny);
    } else if (curr_react === "like") {
      post.total_like += 1;
      console.log(" post like ", post.like);
    } else if (curr_react === "care") {
      post.total_care += 1;
      console.log(" post care ", post.care);
    } else if (curr_react === "wow") {
      post.total_wow += 1;
      console.log(" post wow ", post.wow);
    } else if (curr_react === "angry") {
      post.total_angry += 1;
      console.log(" post angry ", post.angry);
    } else if (curr_react === "sad") {
      post.total_sad += 1;
      console.log(" post sad ", post.sad);
    }
  } else {
    console.log(" prev_reactinnnn ", prev_react);
    console.log(" curr_reactinnnn ", curr_react);

    if (curr_react === "love") {
      post.total_love += 1;
      console.log(" post love ", post.love);
    } else if (curr_react === "funny") {
      post.total_funny += 1;
      console.log(" post funny ", post.funny);
    } else if (curr_react === "like") {
      post.total_like += 1;
      console.log(" post like ", post.like);
    } else if (curr_react === "care") {
      post.total_care += 1;
      console.log(" post care ", post.care);
    } else if (curr_react === "wow") {
      post.total_wow += 1;
      console.log(" post wow ", post.wow);
    } else if (curr_react === "angry") {
      post.total_angry += 1;
      console.log(" post angry ", post.angry);
    } else if (curr_react === "sad") {
      post.total_sad += 1;
      console.log(" post sad ", post.sad);
    }

    if (prev_react === "love") {
      post.total_love -= 1;
      console.log(" post love ", post.love);
    } else if (prev_react === "funny") {
      post.total_funny -= 1;
      console.log(" post funny ", post.funny);
    } else if (prev_react === "like") {
      post.total_like -= 1;
      console.log(" post like ", post.like);
    } else if (prev_react === "care") {
      post.total_care -= 1;
      console.log(" post care ", post.care);
    } else if (prev_react === "wow") {
      post.total_wow -= 1;
      console.log(" post wow ", post.wow);
    } else if (prev_react === "angry") {
      post.total_angry -= 1;
      console.log(" post angry ", post.angry);
    } else if (prev_react === "sad") {
      post.total_sad -= 1;
      console.log(" post sad ", post.sad);
    }
  }

  post.total_reaction =
    post.love +
    post.care +
    post.funny +
    post.sad +
    post.angry +
    post.like +
    post.wow;

  console.log(" total reaction ", post.total_reaction);

  await post.save();
  await user_post_reaction.save();
  console.log(" REACT count ", post.total_reaction);
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
