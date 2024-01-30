const Post = require("../models/post");
const { generateToken } = require("../lib/token");

const getAllPosts = async (req, res) => {
  const posts = await Post.find();
  const token = generateToken(req.user_id);
  res.status(200).json({ posts: posts, token: token });
};

const createPost = async (req, res) => {
<<<<<<< HEAD
  let data = req.body
  data.owner = req.user_id
=======
  let data = req.body;
  // sets the data.owner property from our PostSchema to the required user_id from our token
  data.owner = req.user_id;
  // Creates a new instance of Post from our model post which contains the PostSchema
>>>>>>> refs/remotes/origin/create_post
  const post = new Post(data);
  // saves it to the database
  post.save();

  const newToken = generateToken(req.user_id);
  res.status(201).json({ message: "OK", token: newToken });
};

const PostsController = {
  getAllPosts: getAllPosts,
  createPost: createPost,
};

module.exports = PostsController;
