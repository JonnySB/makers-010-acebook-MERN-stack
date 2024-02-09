require("../mongodb_helper");
const User = require("../../models/user");

describe("User model", () => {
  afterEach(async () => {
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
      lastName: "Brown",
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
      lastName: "Brown",
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
      lastName: "Brown",
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
      lastName: "Brown",
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
      lastName: "Doe",
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
      lastName: "Doe",
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
      lastName: "Doe",
      bio: "An interesting man from London",
      currentLocation: "London",
      workplace: "Makers",
      education: "School of hard knocks",
    });

    await user.save();
    const users = await User.find();

    expect(users[0].username).toEqual("user123");
    expect(users[0].email).toEqual("someone@example.com");
    expect(users[0].password).toEqual("password");
    expect(users[0].dob).toEqual(dob);
    expect(users[0].firstName).toEqual("John");
    expect(users[0].lastName).toEqual("Doe");
    expect(users[0].bio).toEqual("An interesting man from London");
    expect(users[0].currentLocation).toEqual("London");
    expect(users[0].workplace).toEqual("Makers");
    expect(users[0].education).toEqual("School of hard knocks");
  });

  test("A user can have friends", async () => {
    const user1 = new User({
      username: "user123",
      email: "someone@example.com",
      password: "password",
      dob: dob,
      firstName: "John",
      lastName: "Doe",
      friends: new User({
        username: "user456",
        email: "someoneelse@example.com",
        password: "password",
        dob: dob,
        firstName: "Joe",
        lastName: "Bloggs",
      }),
    });

    await user1.save();
    const users = await User.find();

    expect(users[0].friends.length).toEqual(1);
  });
});
