const express = require("express");
const router = express.Router();

const PostsController = require("../controllers/posts");

router.get("/", PostsController.getAllPosts);
router.post("/", PostsController.createPost);
router.post("/comments", PostsController.createComment);
router.post("/likes", PostsController.createLike);
router.post("/unlike", PostsController.deleteLike);

module.exports = router;
