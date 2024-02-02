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

  describe("POST, when username already exists but emails are different", () => {
    test("response code is 201 for (scar1 & kim1)  but 400 for (scar2 & kim2)", async () => {
      const scar1 = await request(app).post("/users").send({
        username: "scar123",
        email: "scar@email.com",
        password: "Password1!",
        dob: new Date("1998-02-05"),
      });
      expect(scar1.statusCode).toBe(201);

      const scar2 = await request(app).post("/users").send({
        username: "scar123",
        email: "scarconstt@email.com",
        password: "Password1!",
        dob: new Date("1998-02-05"),
      });
      expect(scar2.statusCode).toBe(400);

      const kim1 = await request(app).post("/users").send({
        username: "kim123",
        email: "kim@email.com",
        password: "Password1!",
        dob: new Date("1998-02-05"),
      });
      expect(kim1.statusCode).toBe(201);

      const kim2 = await request(app).post("/users").send({
        username: "kim123",
        email: "kimkardashian@email.com",
        password: "Password1!",
        dob: new Date("1998-02-05"),
      });
      expect(kim2.statusCode).toBe(400);
    });

    test("Three users created - only one unique username and all have different emails", async () => {
      const user1 = await request(app).post("/users").send({
        username: "scar123",
        email: "scar@email.com",
        password: "Password1!",
        dob: new Date("1998-02-05"),
      });
      const user2 = await request(app).post("/users").send({
        username: "scar123",
        email: "scarconstt@email.com",
        password: "Password1!",
        dob: new Date("1998-02-05"),
      });

      const user3 = await request(app).post("/users").send({
        username: "scar123",
        email: "scared@email.com",
        password: "Password1!",
        dob: new Date("1998-02-05"),
      });

      const users = [];
      users.push(user1);
      users.push(user2);
      users.push(user3);

      const found = await User.find();
      expect(found.length).toEqual(1);
    });

    test("Three users created - only two has unique username and all have different emails", async () => {
      const user1 = await request(app).post("/users").send({
        username: "scar123",
        email: "scar@email.com",
        password: "Password1!",
        dob: new Date("1998-02-05"),
      });
      const user2 = await request(app).post("/users").send({
        username: "scar1234",
        email: "scarconstt@email.com",
        password: "Password1!",
        dob: new Date("1998-02-05"),
      });

      const user3 = await request(app).post("/users").send({
        username: "scar123",
        email: "scared@email.com",
        password: "Password1!",
        dob: new Date("1998-02-05"),
      });

      const users = [];
      users.push(user1);
      users.push(user2);
      users.push(user3);

      const found = await User.find();
      expect(found.length).toEqual(2);
    });
  });

  describe("POST, when email already exists but usernames are different", () => {
    test("response code is 201 for (scar1 & kim1)  but 400 for (scar2 & kim2)", async () => {
      const scar1 = await request(app).post("/users").send({
        username: "scar123",
        email: "scar@email.com",
        password: "Password1!",
        dob: new Date("1998-02-05"),
      });
      expect(scar1.statusCode).toBe(201);

      const scar2 = await request(app).post("/users").send({
        username: "scar1234",
        email: "scar@email.com",
        password: "Password1!",
        dob: new Date("1998-02-05"),
      });
      expect(scar2.statusCode).toBe(400);

      const kim1 = await request(app).post("/users").send({
        username: "kim123",
        email: "kim@email.com",
        password: "Password1!",
        dob: new Date("1998-02-05"),
      });
      expect(kim1.statusCode).toBe(201);

      const kim2 = await request(app).post("/users").send({
        username: "kim1234",
        email: "kim@email.com",
        password: "Password1!",
        dob: new Date("1998-02-05"),
      });
      expect(kim2.statusCode).toBe(400);
    });

    test("Three users created - only one has unique email and all have different usernames", async () => {
      const user1 = await request(app).post("/users").send({
        username: "scar123",
        email: "scar@email.com",
        password: "Password1!",
        dob: new Date("1998-02-05"),
      });
      const user2 = await request(app).post("/users").send({
        username: "scar1234",
        email: "scar@email.com",
        password: "Password1!",
        dob: new Date("1998-02-05"),
      });

      const user3 = await request(app).post("/users").send({
        username: "scar12345",
        email: "scar@email.com",
        password: "Password1!",
        dob: new Date("1998-02-05"),
      });

      const users = [];
      users.push(user1);
      users.push(user2);
      users.push(user3);

      const found = await User.find();
      expect(found.length).toEqual(1);
    });

    test("Three users created - only two have unique emails and all have different usernames", async () => {
      const user1 = await request(app).post("/users").send({
        username: "scar123",
        email: "scar@email.com",
        password: "Password1!",
        dob: new Date("1998-02-05"),
      });
      const user2 = await request(app).post("/users").send({
        username: "scar1234",
        email: "scarconstt@email.com",
        password: "Password1!",
        dob: new Date("1998-02-05"),
      });

      const user3 = await request(app).post("/users").send({
        username: "scar12345",
        email: "scarconstt@email.com",
        password: "Password1!",
        dob: new Date("1998-02-05"),
      });

      const users = [];
      users.push(user1);
      users.push(user2);
      users.push(user3);

      const found = await User.find();
      expect(found.length).toEqual(2);
    });
  });
});
