const request = require("supertest");
const JWT = require("jsonwebtoken");

const app = require("../../app");
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
    secret
  );
};

let token
describe("/users", () => {
  beforeEach(async () => {
    await User.deleteMany({});
  });

  describe("POST, when email and password are provided", () => {
    test("the response code is 400 for short invalid password", async () => {
      const response = await request(app)
        .post("/users")
        .send({
          username: "pops123",
          email: "poppy@email.com",
          password: "1234",
          dob: new Date("1988-02-05"),
        });

      expect(response.statusCode).toBe(400);
    });

    test("the response code is 201", async () => {
      const response = await request(app)
        .post("/users")
        .send({
          username: "pops123",
          email: "poppy@email.com",
          password: "Password1!",
          dob: new Date("1988-02-05"),
        });

      expect(response.statusCode).toBe(201);
    });

    test("a user is created", async () => {
      await request(app)
        .post("/users")
        .send({
          username: "scar123",
          email: "scarconstt@email.com",
          password: "Password1!",
          dob: new Date("1998-02-05"),
        });

      const users = await User.find();
      const newUser = users[users.length - 1];
      expect(newUser.email).toEqual("scarconstt@email.com");
    });
  });

  describe("POST, when password is missing", () => {
    test("response code is 400", async () => {
      const response = await request(app)
        .post("/users")
        .send({
          username: "scar123",
          email: "scarconstt@email.com",
          dob: new Date("1998-02-05"),
        });

      expect(response.statusCode).toBe(400);
    });

    test("does not create a user", async () => {
      await request(app)
        .post("/users")
        .send({
          username: "scar123",
          email: "scarconstt@email.com",
          dob: new Date("1998-02-05"),
        });

      const users = await User.find();
      expect(users.length).toEqual(0);
    });
  });

  describe("POST, when email is missing", () => {
    test("response code is 400", async () => {
      const response = await request(app)
        .post("/users")
        .send({
          username: "scar123",
          password: "1234",
          dob: new Date("1998-02-05"),
        });

      expect(response.statusCode).toBe(400);
    });

    test("does not create a user", async () => {
      await request(app)
        .post("/users")
        .send({
          username: "scar123",
          password: "1234",
          dob: new Date("1998-02-05"),
        });

      const users = await User.find();
      expect(users.length).toEqual(0);
    });
  });

  describe("POST, when username is missing", () => {
    test("response code is 400", async () => {
      const response = await request(app)
        .post("/users")
        .send({
          email: "scarconstt@email.com",
          password: "1234",
          dob: new Date("1998-02-05"),
        });

      expect(response.statusCode).toBe(400);
    });

    test("does not create a user", async () => {
      await request(app)
        .post("/users")
        .send({
          email: "scarconstt@email.com",
          password: "1234",
          dob: new Date("1998-02-05"),
        });

      const users = await User.find();
      expect(users.length).toEqual(0);
    });
  });

  describe("POST, when dob is missing", () => {
    test("response code is 400", async () => {
      const response = await request(app).post("/users").send({
        username: "scar123",
        email: "scarconstt@email.com",
        password: "1234",
      });

      expect(response.statusCode).toBe(400);
    });

    test("does not create a user", async () => {
      await request(app).post("/users").send({
        username: "scar123",
        email: "scarconstt@email.com",
        password: "1234",
      });

      const users = await User.find();
      expect(users.length).toEqual(0);
    });
  });
});

describe("/users/:id", () => {
  const dob = new Date("1988-02-05");
  const user1 = new User({
    username: "pops123",
    email: "poppy@email.com",
    password: "1234",
    dob: dob,
  });
  const user2 = new User({
    username: "user123",
    email: "user@email.com",
    password: "1234",
    dob: dob,
    firstName: "Joe",
    lastName: "Bloggs",
    bio: "I love acebook",
  });

  beforeAll(async () => {
    await user1.save();
    console.log(user1, "before tests")
    await user2.save();
    console.log(user2, "before tests")
    token = createToken(user1.id);
  });

  afterAll(async () => {
    await User.deleteMany({});
  });

  describe("GET, when token is present", () => {
    test("the response code is 200", async () => {
      const response = await request(app)
        .get(`/users/${user2._id}`)
        .set("Authorization", `Bearer ${token}`);

      expect(response.status).toEqual(200);
    });

    test("returns user data for that id, excluding email and password", async () => {
      const response = await request(app)
        .get(`/users/${user2._id}`)
        .set("Authorization", `Bearer ${token}`);

      const user = response.body.user;

      expect(user.username).toEqual("user123");
      expect(user.dob).toEqual("1988-02-05T00:00:00.000Z");
      expect(user.firstName).toEqual("Joe");
      expect(user.lastName).toEqual("Bloggs");
      expect(user.bio).toEqual("I love acebook");
      expect(user.friends).toEqual([]);

      expect(user.email).toBeFalsy();
      expect(user.password).toBeFalsy();
    });

    test("returns a new token", async () => {
      const response = await request(app)
        .get(`/users/${user2._id}`)
        .set("Authorization", `Bearer ${token}`);

      const newToken = response.body.token;
      const newTokenDecoded = JWT.decode(newToken, process.env.JWT_SECRET);
      const oldTokenDecoded = JWT.decode(token, process.env.JWT_SECRET);

      // iat stands for issued at
      expect(newTokenDecoded.iat > oldTokenDecoded.iat).toEqual(true);
    });
  });

  describe("GET, when token is missing", () => {
  
    test("the response code is 401", async () => {
      const response = await request(app)
      .get(`/users/${user2._id}`)
      expect(response.status).toEqual(401);
    });

    test("returns no user data", async () => {
      const response = await request(app)
      .get(`/users/${user2._id}`)
      expect(response.body.user).toEqual(undefined);
    });

    test("does not return a new token", async () => {
      const response = await request(app)
      .get(`/users/${user2._id}`)
      expect(response.body.token).toEqual(undefined);
    });
  });
});
