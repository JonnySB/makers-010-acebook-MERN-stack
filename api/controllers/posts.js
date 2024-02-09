const Post = require("../models/post");
const { generateToken } = require("../lib/token");

const getAllPosts = async (req, res) => {
  const token = generateToken(req.user_id);

  const posts = await Post.aggregate([
    {
      $lookup: {
        from: "users",
        localField: "owner",
        foreignField: "_id",
        as: "user_data",
      },
    },
    {
      $unset: [
        "user_data._id",
        "user_data.email",
        "user_data.password",
        "user_data.dob",
        "user_data.bio",
        "user_data.currentLocation",
        "user_data.workplace",
        "user_data.education",
        "user_data.friends",
      ],
    },
    {
      $unwind: {
        path: "$comments",
        preserveNullAndEmptyArrays: true,
      },
    },
    {
      $lookup: {
        from: "users",
        localField: "comments.owner",
        foreignField: "_id",
        as: "commenter_info",
      },
    },
    {
      $unset: [
        "commenter_info._id",
        "commenter_info.email",
        "commenter_info.password",
        "commenter_info.dob",
        "commenter_info.bio",
        "commenter_info.currentLocation",
        "commenter_info.workplace",
        "commenter_info.education",
        "commenter_info.friends",
      ],
    },
    {
      $group: {
        _id: "$_id",
        message: { $first: "$message" },
        createdAt: { $first: "$createdAt" },
        likes: { $first: "$likes" },
        user_data: { $first: "$user_data" },
        owner: { $first: "$owner" },
        comments: {
          $push: {
            message: "$comments.message",
            createdAt: "$comments.createdAt",
            owner: "$comments.owner",
            owner_firstName: "$commenter_info.firstName",
            owner_lastName: "$commenter_info.lastName",
            owner_username: "$commenter_info.username",
          },
        },
      },
    },
  ]);

  // sorts post to descending order (last one first) based on the timestamp
  // compareFn(a, b) (first and second element) see sort method doc
  posts.sort((a, b) => b.createdAt - a.createdAt);
  res.status(200).json({ posts: posts, user_id: req.user_id, token: token });
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

  await Post.findByIdAndUpdate(postId, { $push: { comments: comment } });

  const newToken = generateToken(req.user_id);
  res.status(201).json({ message: "OK", token: newToken });
};

const createLike = async (req, res) => {
  const postId = req.body.post_id;

  const user = req.user_id;

  // check user hasn't liked already

  await Post.findByIdAndUpdate(postId, { $push: { likes: user } });

  const newToken = generateToken(req.user_id);
  res.status(201).json({ message: "OK", token: newToken });
};

const deleteLike = async (req, res) => {
  const postId = req.body.post_id;
  const user = req.user_id;

  await Post.findByIdAndUpdate(postId, { $pull: { likes: user } });

  const newToken = generateToken(req.user_id);
  res.status(201).json({ message: "OK", token: newToken });
};

const PostsController = {
  getAllPosts: getAllPosts,
  createPost: createPost,
  createComment: createComment,
  createLike: createLike,
  deleteLike: deleteLike,
};

module.exports = PostsController;
