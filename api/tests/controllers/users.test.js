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

let token;
describe("Tests for route /users for user creation", () => {
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
          firstName: "Jane",
          lastName: "Eyre",
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
          firstName: "Jane",
          lastName: "Eyre",
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
          firstName: "Jane",
          lastName: "Eyre",
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
          firstName: "Jane",
          lastName: "Eyre",
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
          firstName: "Jane",
          lastName: "Eyre",
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
          firstName: "Jane",
          lastName: "Eyre",
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
          firstName: "Jane",
          lastName: "Eyre",
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
          firstName: "Jane",
          lastName: "Eyre",
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
          firstName: "Jane",
          lastName: "Eyre",
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
        firstName: "Jane",
        lastName: "Eyre",
      });

      expect(response.statusCode).toBe(400);
    });

    test("does not create a user", async () => {
      await request(app).post("/users").send({
        username: "scar123",
        email: "scarconstt@email.com",
        password: "1234",
        firstName: "Jane",
        lastName: "Eyre",
      });

      const users = await User.find();
      expect(users.length).toEqual(0);
    });
  });

  describe("POST, when first name is missing", () => {
    test("response code is 400", async () => {
      const response = await request(app)
        .post("/users")
        .send({
          username: "pops123",
          email: "poppy@email.com",
          password: "Password1!",
          dob: new Date("1988-02-05"),
          lastName: "Eyre",
        });

      expect(response.statusCode).toBe(500);
    });

    test("does not create a user", async () => {
      const response = await request(app)
        .post("/users")
        .send({
          username: "pops123",
          email: "poppy@email.com",
          password: "Password1!",
          dob: new Date("1988-02-05"),
          lastName: "Eyre",
        });

      const users = await User.find();
      expect(users.length).toEqual(0);
      expect(response.statusCode).toBe(500);
    });
  });

  describe("POST, when last name is missing", () => {
    test("response code is 400", async () => {
      const response = await request(app)
        .post("/users")
        .send({
          username: "pops123",
          email: "poppy@email.com",
          password: "Password1!",
          dob: new Date("1988-02-05"),
          firstName: "Jane",
        });

      expect(response.statusCode).toBe(500);
    });

    test("does not create a user", async () => {
      const response = await request(app)
        .post("/users")
        .send({
          username: "pops123",
          email: "poppy@email.com",
          password: "Password1!",
          dob: new Date("1988-02-05"),
          firstName: "Jane",
        });

      const users = await User.find();
      expect(users.length).toEqual(0);
      expect(response.statusCode).toBe(500);
    });
  });

  // ADD TESTS FOR FIRST NAME MISSING AND LAST NAME MISSING HERE

  describe("POST, when username already exists but emails are different", () => {
    test("response code is 201 for (scar1 & kim1)  but 400 for (scar2 & kim2)", async () => {
      const scar1 = await request(app)
        .post("/users")
        .send({
          username: "scar123",
          email: "scar@email.com",
          password: "Password1!",
          dob: new Date("1998-02-05"),
          firstName: "Scarr",
          lastName: "Johnson",
        });
      expect(scar1.statusCode).toBe(201);

      const scar2 = await request(app)
        .post("/users")
        .send({
          username: "scar123",
          email: "scarconstt@email.com",
          password: "Password1!",
          dob: new Date("1998-02-05"),
          firstName: "Scar",
          lastName: "Brown",
        });
      expect(scar2.statusCode).toBe(400);

      const kim1 = await request(app)
        .post("/users")
        .send({
          username: "kim123",
          email: "kim@email.com",
          password: "Password1!",
          dob: new Date("1998-02-05"),
          firstName: "Kimberly",
          lastName: "Brown",
        });
      expect(kim1.statusCode).toBe(201);

      const kim2 = await request(app)
        .post("/users")
        .send({
          username: "kim123",
          email: "kimkardashian@email.com",
          password: "Password1!",
          dob: new Date("1998-02-05"),
          firstName: "Kim",
          lastName: "Kardashian",
        });
      expect(kim2.statusCode).toBe(400);
    });

    test("Three users created - only one unique username and all have different emails", async () => {
      const user1 = await request(app)
        .post("/users")
        .send({
          username: "scar123",
          email: "scar@email.com",
          password: "Password1!",
          dob: new Date("1998-02-05"),
          firstName: "Scar",
          lastName: "Brown",
        });
      const user2 = await request(app)
        .post("/users")
        .send({
          username: "scar123",
          email: "scarconstt@email.com",
          password: "Password1!",
          dob: new Date("1998-02-05"),
          firstName: "Scar",
          lastName: "Brown",
        });

      const user3 = await request(app)
        .post("/users")
        .send({
          username: "scar123",
          email: "scared@email.com",
          password: "Password1!",
          dob: new Date("1998-02-05"),
          firstName: "Scar",
          lastName: "Brown",
        });

      const found = await User.find();
      expect(found[0].username).toBe("scar123");
      expect(found[0].email).toBe("scar@email.com");
      expect(found.length).toEqual(1);
    });

    test("Three users created - only two has unique username and all have different emails", async () => {
      const user1 = await request(app)
        .post("/users")
        .send({
          username: "scar123",
          email: "scar@email.com",
          password: "Password1!",
          dob: new Date("1998-02-05"),
          firstName: "Scar",
          lastName: "Brown",
        });
      const user2 = await request(app)
        .post("/users")
        .send({
          username: "scar1234",
          email: "scarconstt@email.com",
          password: "Password1!",
          dob: new Date("1998-02-05"),
          firstName: "Scar",
          lastName: "Brown",
        });

      const user3 = await request(app)
        .post("/users")
        .send({
          username: "scar123",
          email: "scared@email.com",
          password: "Password1!",
          dob: new Date("1998-02-05"),
          firstName: "Scar",
          lastName: "Brown",
        });

      const found = await User.find();
      // console.log(found);
      const usernames = found.map((user) => user.username);
      expect(usernames).toEqual(["scar123", "scar1234"]);
      expect(usernames.length).toEqual(2);
    });
  });

  describe("POST, when email already exists but usernames are different", () => {
    test("response code is 201 for (scar1 & kim1)  but 400 for (scar2 & kim2)", async () => {
      const scar1 = await request(app)
        .post("/users")
        .send({
          username: "scar123",
          email: "scar@email.com",
          password: "Password1!",
          dob: new Date("1998-02-05"),
          firstName: "Scar",
          lastName: "Brown",
        });
      expect(scar1.statusCode).toBe(201);

      const scar2 = await request(app)
        .post("/users")
        .send({
          username: "scar1234",
          email: "scar@email.com",
          password: "Password1!",
          dob: new Date("1998-02-05"),
          firstName: "Scar",
          lastName: "Brown",
        });
      expect(scar2.statusCode).toBe(400);

      const kim1 = await request(app)
        .post("/users")
        .send({
          username: "kim123",
          email: "kim@email.com",
          password: "Password1!",
          dob: new Date("1998-02-05"),
          firstName: "Kim",
          lastName: "Brown",
        });
      expect(kim1.statusCode).toBe(201);

      const kim2 = await request(app)
        .post("/users")
        .send({
          username: "kim1234",
          email: "kim@email.com",
          password: "Password1!",
          dob: new Date("1998-02-05"),
          firstName: "Kim",
          lastName: "Brown",
        });
      expect(kim2.statusCode).toBe(400);
    });

    test("Three users created - only one has unique email and all have different usernames", async () => {
      const user1 = await request(app)
        .post("/users")
        .send({
          username: "scar123",
          email: "scar@email.com",
          password: "Password1!",
          dob: new Date("1998-02-05"),
          firstName: "Scar",
          lastName: "Brown",
        });
      const user2 = await request(app)
        .post("/users")
        .send({
          username: "scar1234",
          email: "scar@email.com",
          password: "Password1!",
          dob: new Date("1998-02-05"),
          firstName: "Scar",
          lastName: "Brown",
        });

      const user3 = await request(app)
        .post("/users")
        .send({
          username: "scar12345",
          email: "scar@email.com",
          password: "Password1!",
          dob: new Date("1998-02-05"),
          firstName: "Scar",
          lastName: "Brown",
        });

      const found = await User.find();
      // console.log("Username it test: ", found[0].email);
      expect(found[0].email).toBe("scar@email.com");
      expect(found.length).toEqual(1)
    });

    test("Three users created - only two have unique emails and all have different usernames", async () => {
      const user1 = await request(app)
        .post("/users")
        .send({
          username: "scar123",
          email: "scar@email.com",
          password: "Password1!",
          dob: new Date("1998-02-05"),
          firstName: "Scar",
          lastName: "Brown",
        });
      const user2 = await request(app)
        .post("/users")
        .send({
          username: "scar1234",
          email: "scarconstt@email.com",
          password: "Password1!",
          dob: new Date("1998-02-05"),
          firstName: "Scar",
          lastName: "Brown",
        });

      const user3 = await request(app)
        .post("/users")
        .send({
          username: "scar12345",
          email: "scarconstt@email.com",
          password: "Password1!",
          dob: new Date("1998-02-05"),
          firstName: "Scar",
          lastName: "Brown",
        });

      const found = await User.find();
      const emails = found.map((user) => user.email);
      expect(emails).toEqual(["scar@email.com", "scarconstt@email.com"]);
    });
  });

  describe("POST, checking if new user dob meets age requirement", () => {
    test("Returns status 400 if user is 4 years old", async () => {
      const response = await request(app)
        .post("/users")
        .send({
          username: "pops1234",
          email: "poppy1@email.com",
          password: "Password1!",
          dob: new Date("2020-02-05"),
          firstName: "Joe",
          lastName: "Bloggs",
        });

      expect(response.statusCode).toBe(400);
    });

    test("Returns status 400 if user is 12 years and 6 months old", async () => {
      const response = await request(app)
        .post("/users")
        .send({
          username: "pops12345",
          email: "poppy2@email.com",
          password: "Password1!",
          dob: new Date("2012-08-05"),
          firstName: "Joe",
          lastName: "Bloggs",
        });

      expect(response.statusCode).toBe(400);
    });

    test("Returns status 201 if user is 13 years on feb 5th 2024", async () => {
      const response = await request(app)
        .post("/users")
        .send({
          username: "pops123456",
          email: "poppy3@email.com",
          password: "Password1!",
          dob: new Date("2011-02-05"),
          firstName: "Joe",
          lastName: "Bloggs",
        });

      expect(response.statusCode).toBe(201);
    });
  });
});

describe("Tests for route /users/:user_id", () => {
  const dob = new Date("1988-02-05");
  const user1 = new User({
    username: "pops123",
    email: "poppy@email.com",
    password: "1234",
    dob: dob,
    firstName: "Pops",
    lastName: "Brown",
  });
  const user2 = new User({
    username: "user123",
    email: "user@email.com",
    password: "Abcd!123",
    dob: dob,
    firstName: "Joe",
    lastName: "Bloggs",
    bio: "I love acebook",
  });

  beforeAll(async () => {
    await user1.save();
    await user2.save();
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
      const response = await request(app).get(`/users/${user2._id}`);
      expect(response.status).toEqual(401);
    });

    test("returns no user data", async () => {
      const response = await request(app).get(`/users/${user2._id}`);
      expect(response.body.user).toEqual(undefined);
    });

    test("does not return a new token", async () => {
      const response = await request(app).get(`/users/${user2._id}`);
      expect(response.body.token).toEqual(undefined);
    });
  });
  //TODO: Need to update test to check that a new token was generated
  describe("POST, when a user updates their profile intro", () => {
    test("A user can update their intro's bio", async () => {
      await request(app)
        .post(`/users/${user1._id}/bio`)
        .set("Authorization", `Bearer ${token}`)
        .send({ bio: "I love acebook" });

      const user = await User.findOne({ _id: user1._id });
      expect(user.bio).toEqual("I love acebook");
    });

    test("A user can update their intro's current location", async () => {
      await request(app)
        .post(`/users/${user1._id}/currentLocation`)
        .set("Authorization", `Bearer ${token}`)
        .send({ currentLocation: "London" });

      const user = await User.findOne({ _id: user1._id });
      expect(user.currentLocation).toEqual("London");
    });

    test("A user can update their intro's workplace", async () => {
      await request(app)
        .post(`/users/${user1._id}/workplace`)
        .set("Authorization", `Bearer ${token}`)
        .send({ workplace: "Makers" });

      const user = await User.findOne({ _id: user1._id });
      expect(user.workplace).toEqual("Makers");
    });

    test("A user can update their intro's education", async () => {
      await request(app)
        .post(`/users/${user1._id}/education`)
        .set("Authorization", `Bearer ${token}`)
        .send({ education: "School of hard knocks" });

      const user = await User.findOne({ _id: user1._id });
      expect(user.education).toEqual("School of hard knocks");
    });
    test("A user can update a field that already has a value", async () => {
      await request(app)
        .post(`/users/${user1._id}/education`)
        .set("Authorization", `Bearer ${token}`)
        .send({ bio: "I love acebook" });

      let user = await User.findOne({ _id: user1._id });
      expect(user.bio).toEqual("I love acebook");

      await request(app)
        .post(`/users/${user1._id}/bio`)
        .set("Authorization", `Bearer ${token}`)
        .send({ bio: "I hate acebook" });

      user = await User.findOne({ _id: user1._id });
      expect(user.bio).toEqual("I hate acebook");
    });
  });
});
