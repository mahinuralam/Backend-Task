const path = require("path");
const fs = require("fs");

const saveFile = async (file) => {
  const fileName = file.originalname;
  const modifiedFileName = fileName.replace(/\s/g, "_"); // Replace spaces with underscores
  const filePath = path.join(__dirname, "..", "uploads", modifiedFileName);
  console.log("asdasd", filePath);
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
    console.log(" prev_react innnn ", curr_react);
    if (curr_react === "love") {
      post.total_love += 1;
      console.log(" post love ", post.total_love);
    } else if (curr_react === "funny") {
      post.total_funny += 1;
      console.log(" post funny ", post.total_funny);
    } else if (curr_react === "like") {
      post.total_like += 1;
      console.log(" post like ", post.total_like);
    } else if (curr_react === "care") {
      post.total_care += 1;
      console.log(" post care ", post.total_care);
    } else if (curr_react === "wow") {
      post.total_wow += 1;
      console.log(" post wow ", post.total_wow);
    } else if (curr_react === "angry") {
      post.total_angry += 1;
      console.log(" post angry ", post.total_angry);
    } else if (curr_react === "sad") {
      post.total_sad += 1;
      console.log(" post sad ", post.total_sad);
    }
  } else {
    console.log(" prev_reactinnnn ", prev_react);
    console.log(" curr_reactinnnn ", curr_react);

    if (curr_react != prev_react) {
      if (curr_react === "love") {
        post.total_love += 1;
        console.log(" post love ", post.total_love);
      } else if (curr_react === "funny") {
        post.total_funny += 1;
        console.log(" post funny ", post.total_funny);
      } else if (curr_react === "like") {
        post.total_like += 1;
        console.log(" post like ", post.total_like);
      } else if (curr_react === "care") {
        post.total_care += 1;
        console.log(" post care ", post.total_care);
      } else if (curr_react === "wow") {
        post.total_wow += 1;
        console.log(" post wow ", post.total_wow);
      } else if (curr_react === "angry") {
        post.total_angry += 1;
        console.log(" post angry ", post.total_angry);
      } else if (curr_react === "sad") {
        post.total_sad += 1;
        console.log(" post sad ", post.total_sad);
      }


      
    }

    if (prev_react === "love") {
      post.total_love -= 1;
      console.log(" post love ", post.total_love);
    } else if (prev_react === "funny") {
      post.total_funny -= 1;
      console.log(" post funny ", post.total_funny);
    } else if (prev_react === "like") {
      post.total_like -= 1;
      console.log(" post like ", post.total_like);
    } else if (prev_react === "care") {
      post.total_care -= 1;
      console.log(" post care ", post.total_care);
    } else if (prev_react === "wow") {
      post.total_wow -= 1;
      console.log(" post wow ", post.total_wow);
    } else if (prev_react === "angry") {
      post.total_angry -= 1;
      console.log(" post angry ", post.total_angry);
    } else if (prev_react === "sad") {
      post.total_sad -= 1;
      console.log(" post sad ", post.total_sad);
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

  console.log(" total reaction ", post.total_reaction);
};

module.exports = {
  saveFile,
  reactStatus,
};
