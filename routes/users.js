const multer = require("multer");
const express = require("express");
const router = express.Router();
const userController = require("../Controllers/users");
const { signup, login } = userController;
const userAuth = require("../middleware/userAuth");


const upload = multer({
  limits: {
    fileSize: 1000000,
  },
  fileFilter(req, file, cb) {
    const allowedExtensions = /\.(jpg|jpeg|png|mp3|wav|mp4|avi)$/;
    if (!file.originalname.match(allowedExtensions)) {
      return cb(new Error("Please upload a valid image, audio, or video file"));
    }
    cb(undefined, true);
  },
});

router.post("/signup", userAuth.saveUser, signup);
router.post("/login", login);

module.exports = router;
