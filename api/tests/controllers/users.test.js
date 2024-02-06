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
          firstName: "Jane",
          lastName: "Eyre"
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
          lastName: "Eyre"
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
          lastName: "Eyre"
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
          lastName: "Eyre"
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
          lastName: "Eyre"
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
          lastName: "Eyre"
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
          lastName: "Eyre"
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
          lastName: "Eyre"
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
          lastName: "Eyre"
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
        lastName: "Eyre"
      });

      expect(response.statusCode).toBe(400);
    });

    test("does not create a user", async () => {
      await request(app).post("/users").send({
        username: "scar123",
        email: "scarconstt@email.com",
        password: "1234",
        firstName: "Jane",
        lastName: "Eyre"
      });

      const users = await User.find();
      expect(users.length).toEqual(0);
    });
  });

  describe("POST, when first name is missing", () => {
    test("response code is 400", async () => {
      const response = await request(app).post("/users").send({
        username: "pops123",
        email: "poppy@email.com",
        password: "Password1!",
        dob: new Date("1988-02-05"),
        lastName: "Eyre"
      });

      expect(response.statusCode).toBe(500);
    });

    test("does not create a user", async () => {
      await request(app).post("/users").send({
        username: "pops123",
        email: "poppy@email.com",
        password: "Password1!",
        dob: new Date("1988-02-05"),
        lastName: "Eyre"
      });

      const users = await User.find();
      expect(users.length).toEqual(0);
    });
  });

  describe("POST, when last name is missing", () => {
    test("response code is 400", async () => {
      const response = await request(app).post("/users").send({
        username: "pops123",
        email: "poppy@email.com",
        password: "Password1!",
        dob: new Date("1988-02-05"),
        firstName: "Jane"
      });

      expect(response.statusCode).toBe(500);
    });

    test("does not create a user", async () => {
      await request(app).post("/users").send({
        username: "pops123",
        email: "poppy@email.com",
        password: "Password1!",
        dob: new Date("1988-02-05"),
        firstName: "Jane"
      });

      const users = await User.find();
      expect(users.length).toEqual(0);
    });
  });
  
  // ADD TESTS FOR FIRST NAME MISSING AND LAST NAME MISSING HERE

  describe("POST, when username already exists but emails are different", () => {
    test("response code is 201 for (scar1 & kim1)  but 400 for (scar2 & kim2)", async () => {
      const scar1 = await request(app).post("/users").send({
        username: "scar123",
        email: "scar@email.com",
        password: "Password1!",
        dob: new Date("1998-02-05"),
        firstName: "Scarr",
        lastName: "Johnson"
      });
      expect(scar1.statusCode).toBe(201);

      const scar2 = await request(app).post("/users").send({
        username: "scar123",
        email: "scarconstt@email.com",
        password: "Password1!",
        dob: new Date("1998-02-05"),
        firstName: "Scar",
        lastName: "Brown"
      });
      expect(scar2.statusCode).toBe(400);

      const kim1 = await request(app).post("/users").send({
        username: "kim123",
        email: "kim@email.com",
        password: "Password1!",
        dob: new Date("1998-02-05"),
        firstName: "Kimberly",
        lastName: "Brown"
      });
      expect(kim1.statusCode).toBe(201);

      const kim2 = await request(app).post("/users").send({
        username: "kim123",
        email: "kimkardashian@email.com",
        password: "Password1!",
        dob: new Date("1998-02-05"),
        firstName: "Kim",
        lastName: "Kardashian"
      });
      expect(kim2.statusCode).toBe(400);
    });

    test("Three users created - only one unique username and all have different emails", async () => {
      const user1 = await request(app).post("/users").send({
        username: "scar123",
        email: "scar@email.com",
        password: "Password1!",
        dob: new Date("1998-02-05"),
        firstName: "Scar",
        lastName: "Brown"
      });
      const user2 = await request(app).post("/users").send({
        username: "scar123",
        email: "scarconstt@email.com",
        password: "Password1!",
        dob: new Date("1998-02-05"),
        firstName: "Scar",
        lastName: "Brown"
      });

      const user3 = await request(app).post("/users").send({
        username: "scar123",
        email: "scared@email.com",
        password: "Password1!",
        dob: new Date("1998-02-05"),
        firstName: "Scar",
        lastName: "Brown"
      });

      const found = await User.find();
      expect(found[0].username).toBe("scar123");
    });

    test("Three users created - only two has unique username and all have different emails", async () => {
      const user1 = await request(app).post("/users").send({
        username: "scar123",
        email: "scar@email.com",
        password: "Password1!",
        dob: new Date("1998-02-05"),
        firstName: "Scar",
        lastName: "Brown"
      });
      const user2 = await request(app).post("/users").send({
        username: "scar1234",
        email: "scarconstt@email.com",
        password: "Password1!",
        dob: new Date("1998-02-05"),
        firstName: "Scar",
        lastName: "Brown"
      });

      const user3 = await request(app).post("/users").send({
        username: "scar123",
        email: "scared@email.com",
        password: "Password1!",
        dob: new Date("1998-02-05"),
        firstName: "Scar",
        lastName: "Brown"
      });

      const found = await User.find();
      console.log(found);
      const usernames = found.map(user => user.username)
      expect(usernames).toEqual(['scar123','scar1234']);
    });
  });

  describe("POST, when email already exists but usernames are different", () => {
    test("response code is 201 for (scar1 & kim1)  but 400 for (scar2 & kim2)", async () => {
      const scar1 = await request(app).post("/users").send({
        username: "scar123",
        email: "scar@email.com",
        password: "Password1!",
        dob: new Date("1998-02-05"),
        firstName: "Scar",
        lastName: "Brown"
      });
      expect(scar1.statusCode).toBe(201);

      const scar2 = await request(app).post("/users").send({
        username: "scar1234",
        email: "scar@email.com",
        password: "Password1!",
        dob: new Date("1998-02-05"),
        firstName: "Scar",
        lastName: "Brown"
      });
      expect(scar2.statusCode).toBe(400);

      const kim1 = await request(app).post("/users").send({
        username: "kim123",
        email: "kim@email.com",
        password: "Password1!",
        dob: new Date("1998-02-05"),
        firstName: "Kim",
        lastName: "Brown"
      });
      expect(kim1.statusCode).toBe(201);

      const kim2 = await request(app).post("/users").send({
        username: "kim1234",
        email: "kim@email.com",
        password: "Password1!",
        dob: new Date("1998-02-05"),
        firstName: "Kim",
        lastName: "Brown"
      });
      expect(kim2.statusCode).toBe(400);
    });

    test("Three users created - only one has unique email and all have different usernames", async () => {
      const user1 = await request(app).post("/users").send({
        username: "scar123",
        email: "scar@email.com",
        password: "Password1!",
        dob: new Date("1998-02-05"),
        firstName: "Scar",
        lastName: "Brown"
      });
      const user2 = await request(app).post("/users").send({
        username: "scar1234",
        email: "scar@email.com",
        password: "Password1!",
        dob: new Date("1998-02-05"),
        firstName: "Scar",
        lastName: "Brown"
      });

      const user3 = await request(app).post("/users").send({
        username: "scar12345",
        email: "scar@email.com",
        password: "Password1!",
        dob: new Date("1998-02-05"),
        firstName: "Scar",
        lastName: "Brown"
      });

      const found = await User.find();
      console.log("Username it test: ", found[0].email);
      expect(found[0].email).toBe("scar@email.com");
    });

    test("Three users created - only two have unique emails and all have different usernames", async () => {
      const user1 = await request(app).post("/users").send({
        username: "scar123",
        email: "scar@email.com",
        password: "Password1!",
        dob: new Date("1998-02-05"),
        firstName: "Scar",
        lastName: "Brown"
      });
      const user2 = await request(app).post("/users").send({
        username: "scar1234",
        email: "scarconstt@email.com",
        password: "Password1!",
        dob: new Date("1998-02-05"),
        firstName: "Scar",
        lastName: "Brown"
      });

      const user3 = await request(app).post("/users").send({
        username: "scar12345",
        email: "scarconstt@email.com",
        password: "Password1!",
        dob: new Date("1998-02-05"),
        firstName: "Scar",
        lastName: "Brown"
      });

      const found = await User.find();
      const emails = found.map(user => user.email)
      expect(emails).toEqual(['scar@email.com','scarconstt@email.com']);
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
    firstName: "Pops",
    lastName: "Brown"
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
