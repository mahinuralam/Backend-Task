const multer = require('multer')
const express = require('express')
const router = express.Router()


const {
    getAllPosts,
    createPost,
    updatePost,
    deletePost,
    getPost,
    postComment,
    userPostReaction,
} = require('../controllers/posts')
const upload = multer({
    limits: {
        fileSize: 1000000
    },
    fileFilter(req, file, cb) {
        const allowedExtensions = /\.(jpg|jpeg|png|mp3|wav|mp4|avi)$/;
        if (!file.originalname.match(allowedExtensions)) {
            return cb(new Error('Please upload a valid image, audio, or video file'));
        }
        cb(undefined, true);
    }
    
});


router.route('/').get(getAllPosts)
router.route('/create').post(upload.single('upload'),createPost)
router.route('/:id').get(getPost).patch(updatePost).delete(deletePost)
router.route('/post_comment').post(postComment)
router.route('/user_post_reaction').post(userPostReaction)


module.exports = router