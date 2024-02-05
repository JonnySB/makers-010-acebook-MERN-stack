require("../mongodb_helper");
const User = require("../../models/user");

describe("User model", () => {
  beforeEach(async () => {
    await User.deleteMany({});
  });

  const dob = new Date("1994-04-15");

  it("has an email address", () => {
    const user = new User({
      username: "user123",
      email: "someone@example.com",
      password: "password",
      dob: new Date("1994-04-15"),
      firstName: "Scar",
      lastName: "Brown"
    });
    expect(user.email).toEqual("someone@example.com");
  });

  it("has a password", () => {
    const user = new User({
      username: "user123",
      email: "someone@example.com",
      password: "password",
      dob: new Date("1994-04-15"),
      firstName: "Scar",
      lastName: "Brown"
    });
    expect(user.password).toEqual("password");
  });

  it("has a username", () => {
    const user = new User({
      username: "user123",
      email: "someone@example.com",
      password: "password",
      dob: new Date("1994-04-15"),
      firstName: "Scar",
      lastName: "Brown"
    });
    expect(user.username).toEqual("user123");
  });

  it("has a dob", () => {
    const user = new User({
      username: "user123",
      email: "someone@example.com",
      password: "password",
      dob: dob,
      firstName: "Scar",
      lastName: "Brown"
    });
    expect(user.dob).toEqual(dob);
  });

  it("has a first name", () => {
    const user = new User({
      username: "user123",
      email: "someone@example.com",
      password: "password",
      dob: dob,
      firstName: "John",
      lastName: "Doe"
    });
    expect(user.firstName).toEqual("John");
  });

  it("has a last name", () => {
    const user = new User({
      username: "user123",
      email: "someone@example.com",
      password: "password",
      dob: dob,
      firstName: "John",
      lastName: "Doe"
    });
    expect(user.lastName).toEqual("Doe");
  });

  it("can list all users", async () => {
    const users = await User.find();
    expect(users).toEqual([]);
  });

  it("can save a user", async () => {
    const user = new User({
      username: "user123",
      email: "someone@example.com",
      password: "password",
      dob: dob,
      firstName: "John",
      lastName: "Doe"
    });

    await user.save();
    const users = await User.find();

    expect(users[0].username).toEqual("user123");
    expect(users[0].email).toEqual("someone@example.com");
    expect(users[0].password).toEqual("password");
    expect(users[0].dob).toEqual(dob);
    expect(users[0].firstName).toEqual("John");
    expect(users[0].lastName).toEqual("Doe");
  });
});
