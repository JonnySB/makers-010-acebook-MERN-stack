const request = require("supertest");

const app = require("../../app");
const User = require("../../models/user");

require("../mongodb_helper");

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
