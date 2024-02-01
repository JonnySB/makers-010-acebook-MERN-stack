require("../mongodb_helper");
const mongoose = require("mongoose");

const Post = require("../../models/post");

describe("Post model", () => {
  const date = new Date("2024-01-31T13:51:02.009+00:00");
  beforeEach(async () => {
    await Post.deleteMany({});
  });
  afterEach(async () => {
    await Post.deleteMany({});
  });

  it("it tests that post has a message", () => {
    const post = new Post({
      message: "some message",
      createdAt: date,
      owner: "65ba5046a9d4c1867a4cd305",
    });
    expect(post.message).toEqual("some message");
  });

  it("it tests that post has a createdAt", () => {
    const post = new Post({
      message: "some message",
      createdAt: date,
      owner: "65ba5046a9d4c1867a4cd305",
    });
    expect(post.createdAt).toEqual(date);
  });

  it("it tests that post has a owner", () => {
    const post = new Post({
      message: "some message",
      createdAt: date,
      owner: "65ba5046a9d4c1867a4cd305",
    });
    // mongoose.Types.ObjectId
    expect(post.owner).toEqual(
      new mongoose.Types.ObjectId("65ba5046a9d4c1867a4cd305")
    );
    // expect(post.owner).toEqual("65ba5046a9d4c1867a4cd305");
  });

  it("it tests that post is created with empty comments array", () => {
    const post = new Post({
      message: "some message",
      createdAt: date,
      owner: "65ba5046a9d4c1867a4cd305",
    });
    expect(post.comments).toEqual([]);
  });

  describe("Comments sub-model tests", () => {
    const post = new Post({
      message: "some message",
      createdAt: date,
      owner: "65ba5046a9d4c1867a4cd305",
      comments: [
        {
          message: "Some comment",
          createdAt: date,
          owner: "65ba5046a9d4c1867a4cd305",
        },
      ],
    });

    it("tests that comments have a message", () => {
      expect(post.comments[0].message).toEqual("Some comment");
    });

    it("tests that comments have a createdAt", () => {
      expect(post.comments[0].createdAt).toEqual(date);
    });

    it("tests that comments have an owner", () => {
      expect(post.comments[0].owner).toEqual(
        new mongoose.Types.ObjectId("65ba5046a9d4c1867a4cd305")
      );
    });
  });

  it("it tests that post is created with empty likes array", () => {
    const post = new Post({
      message: "some message",
      createdAt: date,
      owner: "65ba5046a9d4c1867a4cd305",
    });
    expect(post.likes).toEqual([]);
  });

  describe("likes sub-model tests", () => {
    const post = new Post({
      message: "some message",
      createdAt: date,
      owner: "65ba5046a9d4c1867a4cd305",
      likes: ["65ba5046a9d4c1867a4cd305"],
    });

    it("tests that comments have a message", () => {
      expect(post.likes[0]).toEqual(
        new mongoose.Types.ObjectId("65ba5046a9d4c1867a4cd305")
      );
    });
  });

  it("can list all posts", async () => {
    const posts = await Post.find();
    expect(posts).toEqual([]);
  });

  it("can save a post", async () => {
    const post = new Post({
      message: "some message",
      createdAt: date,
      owner: "65ba5046a9d4c1867a4cd305",
    });

    await post.save();
    const posts = await Post.find();
    expect(posts[0].message).toEqual("some message");
  });
});

// it tests that comments have a message
// it tests that comments have a createdAt
// it tests that comments have a owner
//
// it tests that likes have an id
//
// add to it can save a post for the different fields
