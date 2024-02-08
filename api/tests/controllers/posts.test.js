const request = require("supertest");
const JWT = require("jsonwebtoken");

const app = require("../../app");
const Post = require("../../models/post");
const User = require("../../models/user");

require("../mongodb_helper");

const secret = process.env.JWT_SECRET;

const createToken = (userId) => {
  return JWT.sign(
    {
      user_id: userId,
      // Backdate this token of 5 minutes
      iat: Math.floor(Date.now() / 1000) - 5 * 60,
      // Set the JWT token to expire in 10 minutes
      exp: Math.floor(Date.now() / 1000) + 10 * 60,
    },
    secret,
  );
};

let token;
describe("/posts", () => {
  const user = new User({
    username: "pops123",
    email: "poppy@email.com",
    password: "1234",
    dob: new Date("1988-02-05"),
    firstName: "Scar",
    lastName: "Brown",
  });
  beforeAll(async () => {
    await user.save();
    await Post.deleteMany({});
    token = createToken(user.id);
  });

  afterEach(async () => {
    await User.deleteMany({});
    await Post.deleteMany({});
  });

  describe("POST, when a valid token is present", () => {
    test("responds with a 201", async () => {
      const response = await request(app)
        .post("/posts")
        .set("Authorization", `Bearer ${token}`)
        .send({ message: "Hello World!" });
      expect(response.status).toEqual(201);
    });

    test("creates a new post", async () => {
      await request(app)
        .post("/posts")
        .set("Authorization", `Bearer ${token}`)
        .send({ message: "Hello World!!" });

      const posts = await Post.find();
      expect(posts.length).toEqual(1);
      expect(posts[0].message).toEqual("Hello World!!");
    });

    test("returns a new token", async () => {
      const testApp = request(app);
      const response = await testApp
        .post("/posts")
        .set("Authorization", `Bearer ${token}`)
        .send({ message: "hello world" });

      const newToken = response.body.token;
      const newTokenDecoded = JWT.decode(newToken, process.env.JWT_SECRET);
      const oldTokenDecoded = JWT.decode(token, process.env.JWT_SECRET);

      // iat stands for issued at
      expect(newTokenDecoded.iat > oldTokenDecoded.iat).toEqual(true);
    });
  });

  describe("POST, when token is missing", () => {
    test("responds with a 401", async () => {
      const response = await request(app)
        .post("/posts")
        .send({ message: "hello again world" });

      expect(response.status).toEqual(401);
    });

    test("a post is not created", async () => {
      const response = await request(app)
        .post("/posts")
        .send({ message: "hello again world" });

      const posts = await Post.find();
      expect(posts.length).toEqual(0);
    });

    test("a token is not returned", async () => {
      const response = await request(app)
        .post("/posts")
        .send({ message: "hello again world" });

      expect(response.body.token).toEqual(undefined);
    });
  });

  describe("GET, when token is present", () => {
    const date = new Date("2024-01-31T13:51:02.009+00:00");

    test("the response code is 200", async () => {
      const post1 = new Post({
        message: "I love all my children equally",
        createdAt: date,
        owner: "65ba5046a9d4c1867a4cd305",
      });
      const post2 = new Post({
        message: "I've never cared for GOB",
        createdAt: date,
        owner: "65ba5046a9d4c1867a4cd305",
      });
      await post1.save();
      await post2.save();

      const response = await request(app)
        .get("/posts")
        .set("Authorization", `Bearer ${token}`);

      expect(response.status).toEqual(200);
    });

    test("returns every post in the collection", async () => {
      const post1 = new Post({
        message: "I love all my children equally",
        createdAt: new Date("2024-01-31T13:51:02.009+00:00"),
        owner: "65ba5046a9d4c1867a4cd305",
      });
      const post2 = new Post({
        message: "I've never cared for GOB",
        createdAt: new Date("2024-02-21T13:51:02.009+00:00"),
        owner: "65ba5046a9d4c1867a4cd305",
      });
      await post1.save();
      await post2.save();

      const response = await request(app)
        .get("/posts")
        .set("Authorization", `Bearer ${token}`);

      const posts = response.body.posts;

      const firstPost = posts[1];
      const secondPost = posts[0];

      expect(firstPost.message).toEqual("I love all my children equally");
      expect(secondPost.message).toEqual("I've never cared for GOB");
    });

    // TODO:
    test.todo("returned post doesn't contain user data");

    test("returns a new token", async () => {
      const post1 = new Post({
        message: "I love all my children equally",
        createdAt: date,
        owner: "65ba5046a9d4c1867a4cd305",
      });
      const post2 = new Post({
        message: "I've never cared for GOB",
        createdAt: date,
        owner: "65ba5046a9d4c1867a4cd305",
      });
      await post1.save();
      await post2.save();

      const response = await request(app)
        .get("/posts")
        .set("Authorization", `Bearer ${token}`);

      const newToken = response.body.token;
      const newTokenDecoded = JWT.decode(newToken, process.env.JWT_SECRET);
      const oldTokenDecoded = JWT.decode(token, process.env.JWT_SECRET);

      // iat stands for issued at
      expect(newTokenDecoded.iat > oldTokenDecoded.iat).toEqual(true);
    });
  });

  describe("GET, when token is missing", () => {
    const date = new Date("2024-01-31T13:51:02.009+00:00");

    test("the response code is 401", async () => {
      const post1 = new Post({
        message: "I love all my children equally",
        createdAt: date,
        owner: "65ba5046a9d4c1867a4cd305",
      });
      const post2 = new Post({
        message: "I've never cared for GOB",
        createdAt: date,
        owner: "65ba5046a9d4c1867a4cd305",
      });
      await post1.save();
      await post2.save();

      const response = await request(app).get("/posts");

      expect(response.status).toEqual(401);
    });

    test("returns no posts", async () => {
      const post1 = new Post({
        message: "I love all my children equally",
        createdAt: date,
        owner: "65ba5046a9d4c1867a4cd305",
      });
      const post2 = new Post({
        message: "I've never cared for GOB",
        createdAt: date,
        owner: "65ba5046a9d4c1867a4cd305",
      });
      await post1.save();
      await post2.save();

      const response = await request(app).get("/posts");

      expect(response.body.posts).toEqual(undefined);
    });

    test("does not return a new token", async () => {
      const post1 = new Post({
        message: "I love all my children equally",
        createdAt: date,
        owner: "65ba5046a9d4c1867a4cd305",
      });
      const post2 = new Post({
        message: "I've never cared for GOB",
        createdAt: date,
        owner: "65ba5046a9d4c1867a4cd305",
      });
      await post1.save();
      await post2.save();

      const response = await request(app).get("/posts");

      expect(response.body.token).toEqual(undefined);
    });
  });
});

describe("/posts/comments", () => {
  const date = new Date("2024-01-31T13:51:02.009+00:00");
  const user = new User({
    username: "pops123",
    email: "poppy@email.com",
    password: "Password1!",
    dob: new Date("1988-02-05"),
    firstName: "Scar",
    lastName: "Brown",
  });
  beforeAll(async () => {
    await user.save();
    await Post.deleteMany({});
    token = createToken(user.id);
  });

  afterEach(async () => {
    await User.deleteMany({});
    await Post.deleteMany({});
  });

  describe("POST, when a valid token is present", () => {
    test("responds with a 201", async () => {
      const post = new Post({
        message: "I'm a new post",
        createdAt: date,
        owner: "65ba5046a9d4c1867a4cd305",
      });
      await post.save();
      const response = await request(app)
        .post("/posts/comments")
        .set("Authorization", `Bearer ${token}`)
        .send({
          message: "Hello World!",
          post_id: post._id,
        });
      expect(response.status).toEqual(201);
    });

    test("creates a new comment", async () => {
      const post = new Post({
        message: "I'm a new post",
        createdAt: date,
        owner: "65ba5046a9d4c1867a4cd305",
      });
      await post.save();
      await request(app)
        .post("/posts/comments")
        .set("Authorization", `Bearer ${token}`)
        .send({
          message: "Hello World!!",
          post_id: post._id,
        });

      const posts = await Post.find();

      expect(posts[0].comments.length).toEqual(1);
      expect(posts[0].comments[0].message).toEqual("Hello World!!");
      expect(posts[0].comments[0].owner).toEqual(user._id);
    });

    test("returns a new token", async () => {
      const post = new Post({
        message: "I'm a new post",
        createdAt: date,
        owner: "65ba5046a9d4c1867a4cd305",
      });
      await post.save();
      const testApp = request(app);
      const response = await testApp
        .post("/posts/comments")
        .set("Authorization", `Bearer ${token}`)
        .send({
          message: "Hello World!!",
          post_id: post._id,
        });

      const newToken = response.body.token;
      const newTokenDecoded = JWT.decode(newToken, process.env.JWT_SECRET);
      const oldTokenDecoded = JWT.decode(token, process.env.JWT_SECRET);

      // iat stands for issued at
      expect(newTokenDecoded.iat > oldTokenDecoded.iat).toEqual(true);
    });
  });

  describe("POST, when token is missing", () => {
    test("responds with a 401", async () => {
      const post = new Post({
        message: "I'm a new post",
        createdAt: date,
        owner: "65ba5046a9d4c1867a4cd305",
      });
      await post.save();
      const testApp = request(app);
      const response = await testApp.post("/posts/comments").send({
        message: "Hello World!!",
        post_id: post._id,
      });

      expect(response.status).toEqual(401);
    });

    test("a comment is not created", async () => {
      const post = new Post({
        message: "I'm a new post",
        createdAt: date,
        owner: "65ba5046a9d4c1867a4cd305",
      });
      await post.save();
      const testApp = request(app);
      const response = await testApp.post("/posts/comments").send({
        message: "Hello World!!",
        post_id: post._id,
      });

      const posts = await Post.find();
      // console.log(posts[0]);
      expect(posts[0].comments).toEqual([]);
    });

    test("a token is not returned", async () => {
      const post = new Post({
        message: "I'm a new post",
        createdAt: date,
        owner: "65ba5046a9d4c1867a4cd305",
      });
      await post.save();
      const testApp = request(app);
      const response = await testApp.post("/posts/comments").send({
        message: "Hello World!!",
        post_id: post._id,
      });

      expect(response.body.token).toEqual(undefined);
    });
  });
});

describe("/posts/likes", () => {
  const date = new Date("2024-01-31T13:51:02.009+00:00");
  const user = new User({
    username: "pops123",
    email: "poppy@email.com",
    password: "Password1!",
    dob: new Date("1988-02-05"),
    firstName: "Scar",
    lastName: "Brown",
  });
  beforeAll(async () => {
    await user.save();
    await Post.deleteMany({});
    token = createToken(user.id);
  });

  afterEach(async () => {
    await User.deleteMany({});
    await Post.deleteMany({});
  });

  describe("POST, when a valid token is present", () => {
    test("responds with a 201", async () => {
      const post = new Post({
        message: "I'm a new post",
        createdAt: date,
        owner: "65ba5046a9d4c1867a4cd305",
      });
      await post.save();
      const response = await request(app)
        .post("/posts/likes")
        .set("Authorization", `Bearer ${token}`)
        .send({
          post_id: post._id,
        });
      expect(response.status).toEqual(201);
    });

    test("creates a new like", async () => {
      const post = new Post({
        message: "I'm a new post",
        createdAt: date,
        owner: "65ba5046a9d4c1867a4cd305",
      });
      await post.save();
      const response = await request(app)
        .post("/posts/likes")
        .set("Authorization", `Bearer ${token}`)
        .send({
          post_id: post._id,
        });

      const posts = await Post.find();
      expect(posts[0].likes.length).toEqual(1);
      expect(posts[0].likes[0]).toEqual(user._id);
    });

    test("returns a new token", async () => {
      const post = new Post({
        message: "I'm a new post",
        createdAt: date,
        owner: "65ba5046a9d4c1867a4cd305",
      });
      await post.save();
      const response = await request(app)
        .post("/posts/likes")
        .set("Authorization", `Bearer ${token}`)
        .send({
          post_id: post._id,
        });

      const newToken = response.body.token;
      const newTokenDecoded = JWT.decode(newToken, process.env.JWT_SECRET);
      const oldTokenDecoded = JWT.decode(token, process.env.JWT_SECRET);

      // iat stands for issued at
      expect(newTokenDecoded.iat > oldTokenDecoded.iat).toEqual(true);
    });
  });

  describe("POST, when token is missing", () => {
    test("responds with a 401", async () => {
      const post = new Post({
        message: "I'm a new post",
        createdAt: date,
        owner: "65ba5046a9d4c1867a4cd305",
      });
      await post.save();
      const response = await request(app).post("/posts/likes").send({
        post_id: post._id,
      });

      expect(response.status).toEqual(401);
    });

    test("a like is not created", async () => {
      const post = new Post({
        message: "I'm a new post",
        createdAt: date,
        owner: "65ba5046a9d4c1867a4cd305",
      });
      await post.save();
      const response = await request(app).post("/posts/likes").send({
        post_id: post._id,
      });

      const posts = await Post.find();
      expect(posts[0].likes.length).toEqual(0);
    });

    test("a token is not returned", async () => {
      const post = new Post({
        message: "I'm a new post",
        createdAt: date,
        owner: "65ba5046a9d4c1867a4cd305",
      });
      await post.save();
      const response = await request(app).post("/posts/likes").send({
        post_id: post._id,
      });

      expect(response.body.token).toEqual(undefined);
    });
  });
});
