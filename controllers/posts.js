const fs = require("fs");
const path = require("path");
const asyncWrapper = require("../middleware/async");
const db = require("../database/connection");
const saveFile = require("../helpers/posts");
const ReactionEnum = require("./enums");
const Post = db.Post;
const Post_comment = db.Post_comment;
const Reaction = db.Reaction;
const User_post_reaction = db.User_post_reaction;


const createPost = async (req, res, next) => {
  console.log("req", req.file);
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

  // Check if there is already a user_post_reaction with user_id
  let user_post_reaction = await User_post_reaction.findOne({
    where: { user_id: user_id, post_id: post_id },
  });

  if (!user_post_reaction) {
    //   User_post_reaction doesn't exist, create a new one
    console.log(" ASE ");
    user_post_reaction = await User_post_reaction.create(req.body);
  }

  // Extract the reaction_id and status from the user_post_reaction
  const { reaction_id, status } = user_post_reaction;

  // Perform a query on the Post table
  const id = post_id;
  const post = await Post.findByPk(id);
  if (!post) {
    return next(createCustomError(`No Post with id : ${id}`, 404));
  }

  let reactionValue = null;

  for (const [key, value] of Object.entries(ReactionEnum)) {
    if (value === reaction_id) {
      reactionValue = key;
      console.log(" FOUND ", key);
      break;
    }
  }

  let react;

  if (status === false) {
    //   Increment total_reaction by one
    react = 1;
    post.total_reaction += react;
    await post.save();
    user_post_reaction.status = true;
  } else {
    //   Decrement total_reaction by one
    react = -1;
    post.total_reaction += react;
    await post.save();
    user_post_reaction.status = false;
  }
  user_post_reaction.save();
  console.log(" REACT count ", post.total_reaction);
  res.status(200).json({ user_post_reaction });

  if (reactionValue === "Love") {
    post.love += react;
  } else if (reactionValue === "Funny") {
    post.funny += react;
  } else if (reactionValue === "Like") {
    post.like += react;
  } else if (reactionValue === "Care") {
    post.care += react;
  } else if (reactionValue === "Wow") {
    post.wow += react;
  } else if (reactionValue === "Angry") {
    post.angry += react;
  } else if (reactionValue === "Sad") {
    post.sad += react;
  }
});

module.exports = {
  getAllPosts,
  getPost,
  createPost,
  deletePost,
  updatePost,
  postComment,
  reaction,
  userPostReaction,
};
