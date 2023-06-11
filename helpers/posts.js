const path = require("path");
const fs = require("fs");

const saveFile = async (file) => {
  const fileName = file.originalname;
  const modifiedFileName = fileName.replace(/\s/g, "_"); // Replace spaces with underscores
  const filePath = path.join(__dirname, "..", "uploads", modifiedFileName);
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

const reactStatus = async (post, status, curr_react, prev_react) => {
  if (status === false) {
    if (curr_react === "love") {
      post.total_love += 1;
    } else if (curr_react === "funny") {
      post.total_funny += 1;
    } else if (curr_react === "like") {
      post.total_like += 1;
    } else if (curr_react === "care") {
      post.total_care += 1;
    } else if (curr_react === "wow") {
      post.total_wow += 1;
    } else if (curr_react === "angry") {
      post.total_angry += 1;
    } else if (curr_react === "sad") {
      post.total_sad += 1;
    }
  } else {

    if (curr_react != prev_react) {
      if (curr_react === "love") {
        post.total_love += 1;
      } else if (curr_react === "funny") {
        post.total_funny += 1;
      } else if (curr_react === "like") {
        post.total_like += 1;
      } else if (curr_react === "care") {
        post.total_care += 1;
      } else if (curr_react === "wow") {
        post.total_wow += 1;
      } else if (curr_react === "angry") {
        post.total_angry += 1;
      } else if (curr_react === "sad") {
        post.total_sad += 1;
      }


      
    }

    if (prev_react === "love") {
      post.total_love -= 1;
    } else if (prev_react === "funny") {
      post.total_funny -= 1;
    } else if (prev_react === "like") {
      post.total_like -= 1;
    } else if (prev_react === "care") {
      post.total_care -= 1;
    } else if (prev_react === "wow") {
      post.total_wow -= 1;
    } else if (prev_react === "angry") {
      post.total_angry -= 1;
    } else if (prev_react === "sad") {
      post.total_sad -= 1;
    }
  }

  post.total_reaction =
    post.total_love +
    post.total_care +
    post.total_funny +
    post.total_sad +
    post.total_angry +
    post.total_like +
    post.total_wow;

};

module.exports = {
  saveFile,
  reactStatus,
};
