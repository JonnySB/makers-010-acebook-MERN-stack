const Post = require("../models/post");
const User = require("../models/user")
const { generateToken } = require("../lib/token");

const getAllPosts = async (req, res) => {
  const token = generateToken(req.user_id);

  const posts = await Post.aggregate([
    {
      $lookup:
      {
        from: "users",
        localField: "owner",
        foreignField: "_id",
        as: "user_data"
      }
    },
    {
      $unset: 
      [
        "owner", 
        "user_data._id",
        "user_data.email",
        "user_data.password",
        "user_data.dob",
        "user_data.bio",
        "user_data.friends"
      ]
    }
  ]);

  // sorts post to descending order (last one first) based on the timestamp
  // compareFn(a, b) (first and second element) see sort method doc
  posts.sort((a, b) => b.timestamp - a.timestamp);

  res.status(200).json({ posts: posts, token: token });
};

const createPost = async (req, res) => {
  let data = req.body;
  // sets the data.owner property from our PostSchema to the required user_id from our token
  data.owner = req.user_id;
  // Creates a new instance of Post from our model post which contains the PostSchema
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
