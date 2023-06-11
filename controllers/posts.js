const fs = require('fs');
const path = require('path')
const asyncWrapper = require('../middleware/async')
const db = require("../database/connection")
const Post = db.Post
const Post_comment = db.Post_comment
const Reaction = db.Reaction
const User_post_reaction = db.User_post_reaction


const saveFile = async (file) => {
    const fileName = file.originalname;
    const modifiedFileName = fileName.replace(/\s/g, '_'); // Replace spaces with underscores
    const filePath = path.join(__dirname, '..', 'uploads', modifiedFileName);
    console.log('asdasd',filePath)
    return new Promise((resolve, reject) => {
        fs.writeFile(filePath, file.buffer, (error) => {
            if (error) {
                reject(error);
            } else {
                resolve(filePath);
            }
        });
    });
};

const ReactionEnum = {
    Like: 1,
    Love: 2,
    Care: 3,
    Angry: 4,
    Wow: 5,
    Sad: 6,
    Funny: 7,
};

const createPost = (async (req, res, next) => {
    console.log("req",req.file)
    const filePath = await saveFile(req.file);
    const fileName = req.file.originalname;
    const modifiedFileName = fileName.replace(/\s/g, '_'); // Replace spaces with underscores
    console.log('File saved at:', filePath);
    req.body.attachment_url = 'http://localhost:3000/uploads/' + modifiedFileName
    const post = await Post.create(req.body)
    res.status(200).json({ post })
})

const getAllPosts = asyncWrapper(async (req, res, next) => {
    // console.log(req.query)
    const { page , limit  } = req.query; // Get the page number and limit from the query parameters

    const offset = (page - 1) * limit; // Calculate the offset based on the page number and limit

    console.log("GET ALL POST")

    
    Post.hasMany(Post_comment, { foreignKey: 'poster_id'})

    const post = await Post.findAll({
        include: [
            {
                model: Post_comment
            }
        ],
        limit,
        offset
    })
    const totalCount = await Post.count();

    // Calculate the total page count
    const totalPages = Math.ceil(totalCount / limit);

    if (!post) {
        res.status(404)
    }
    res.status(200).json({ post , total_page:totalPages})

})

const getPost = asyncWrapper(async (req, res, next) => {
    console.log("GET POST")
    const id = req.params.id
    const post = await Post.findByPk(id)
    if (!post) {
        res.status(404)
    }
    res.status(200).json({ post })
})

const updatePost = asyncWrapper(async (req, res, next) => {
    console.log("UPDATE POST");
    const id = req.params.id;
    const post = await Post.update(req.body, { where: { id: id } }); 
    if (!post) {
        res.status(404);
    }
    res.status(200).json({ post });
  });
  

const deletePost = asyncWrapper(async (req, res, next) => {
    console.log("DELETE POST")
    const id = req.params.id
    const post = await Post.destroy({ where: { id: id } });
    if (!post) {
        res.status(404)
    }
    res.status(200).json({ post })
})

const postComment = asyncWrapper(async (req, res, next) => {
    console.log("POST COMMENT")
    const post_comment = await Post_comment.create(req.body)
    res.status(200).json({ post_comment })
})

const reaction = asyncWrapper(async (req, res, next) => {
    console.log("REACTION")
    const reaction = await Reaction.create(req.body)
    res.status(200).json({ reaction })
})

const userPostReaction = asyncWrapper(async (req, res, next) => {
    console.log("USER POST REACTION");
    const { user_id, post_id } = req.body;
    console.log(" IDS ", user_id, post_id);
  
    // Check if there is already a user_post_reaction with user_id
    let user_post_reaction = await User_post_reaction.findOne({
      where: { user_id: user_id, post_id: post_id },
    });
  
    if (!user_post_reaction) {
      // User_post_reaction doesn't exist, create a new one
      user_post_reaction = await User_post_reaction.create(req.body);
    }
  
    // Extract the reaction_id and status from the user_post_reaction
    const { reaction_id, status } = user_post_reaction;
  
    // Perform a query on the Post table
    const post = await Post.findOne({ where: { id: post_id } });
  
    let reactionValue = null;
  
    for (const [key, value] of Object.entries(ReactionEnum)) {
      if (value === reaction_id) {
        reactionValue = key;
        break;
      }
    }
  
    if (status === 0) {
      // Increment total_reaction by one
      post.total_reaction += 1;
      if (reactionValue === "Love") {
        post.love += 1;
      } else if (reactionValue === "Funny") {
        post.funny += 1;
      } else if (reactionValue === "Like") {
        post.like += 1;
      } else if (reactionValue === "Care") {
        post.care += 1;
      } else if (reactionValue === "Wow") {
        post.wow += 1;
      } else if (reactionValue === "Angry") {
        post.angry += 1;
      } else if (reactionValue === "Sad") {
        post.sad += 1;
      }
      await post.save();
      user_post_reaction.status = 1; // Update the status of user_post_reaction
      await user_post_reaction.save();
    } else {
      // Decrement total_reaction by one
      post.total_reaction -= 1;
      if (reactionValue === "Love") {
        post.love -= 1;
      } else if (reactionValue === "Funny") {
        post.funny -= 1;
      } else if (reactionValue === "Like") {
        post.like -= 1;
      } else if (reactionValue === "Care") {
        post.care -= 1;
      } else if (reactionValue === "Wow") {
        post.wow -= 1;
      } else if (reactionValue === "Angry") {
        post.angry -= 1;
      } else if (reactionValue === "Sad") {
        post.sad -= 1;
      }
      await post.save();
      user_post_reaction.status = 0; // Update the status of user_post_reaction
      await user_post_reaction.save();
    }
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
    reaction,
    userPostReaction,
}