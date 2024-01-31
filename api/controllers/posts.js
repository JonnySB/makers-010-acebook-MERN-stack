const Post = require("../models/post");
const Comment = require("../models/comment");
const { generateToken } = require("../lib/token");

const getAllPosts = async (req, res) => {
  const posts = await Post.find();
  const token = generateToken(req.user_id);
  res.status(200).json({ posts: posts, token: token });
};

const createPost = async (req, res) => {
  const message = req.body.message;
  console.log(req.body.message, req.user_id);
  const createdAt = new Date();
  const owner = req.user_id; // collect from logged in user?

  const post = new Post({ message, createdAt, owner });
  post.save();

  const newToken = generateToken(req.user_id);
  res.status(201).json({ message: "OK", token: newToken });
};

// add comment:
const createComment = async (req, res) => {
  const postID = req.body.post_id;

  const message = req.body.message;
  const createdAt = new Date();
  const owner = req.user_id; // collect from logged in user?

  const comment = new Comment(message, createdAt, owner);
};

const PostsController = {
  getAllPosts: getAllPosts,
  createPost: createPost,
};

module.exports = PostsController;
