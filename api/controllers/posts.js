const Post = require("../models/post");
const Comment = require("../models/comment");
const { decodeToken, generateToken } = require("../lib/token");

const getAllPosts = async (req, res) => {
  const posts = await Post.find();
  const token = generateToken(req.user_id);
  res.status(200).json({ posts: posts, token: token });
};

const createPost = async (req, res) => {
  const message = req.body.message;
  const createdAt = new Date();
  const owner = req.user_id;

  const post = new Post({ message, createdAt, owner });
  post.save();

  const newToken = generateToken(req.user_id);
  res.status(201).json({ message: "OK", token: newToken });
};

// add comment:
const createComment = async (req, res) => {
  const postId = req.body.post_id;

  const comment = {
    message: req.body.message,
    createdAt: new Date(),
    owner: req.user_id,
  };

  Post.updateOne({ _id: postId }, { $push: { comments: comment } });

  const newToken = generateToken(req.user_id);
  res.status(201).json({ message: "OK", token: newToken });
};

const PostsController = {
  getAllPosts: getAllPosts,
  createPost: createPost,
  createComment: createComment,
};

module.exports = PostsController;
