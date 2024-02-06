import createFetchMock from "vitest-fetch-mock";
import { describe, expect, vi } from "vitest";

import { getUserById } from "../../src/services/user";
import { stringify } from "postcss";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

// Mock fetch function
createFetchMock(vi).enableMocks();

const userDataMock = {
  username: "user123",
  dob: "1985",
  firstName: "John",
  lastName: "Doe",
  bio: "An interesting man from London",
  currentLocation: "London",
  workplace: "Makers",
  education: "School of hard knocks",
};

const tokenMock = "testToken";
const userIdMock = "123";

describe("User service", () => {
  describe("find user - GET request", () => {
    test("includes a token and userId with its request", async () => {
      fetch.mockResponseOnce(JSON.stringify({}), { status: 200 });

      await getUserById(userIdMock, tokenMock);

      const fetchArguments = fetch.mock.lastCall;
      const url = fetchArguments[0];
      const options = fetchArguments[1];
      // console.log("test", fetchArguments)
      expect(url).toEqual(`${BACKEND_URL}/users/123`);
      expect(options.method).toEqual("GET");
      expect(options.headers["Authorization"]).toEqual("Bearer testToken");
    });

    test("rejects with an error if the status is not 200", async () => {
      fetch.mockResponseOnce(JSON.stringify(), { status: 400 });

      try {
        await getUserById("testToken");
      } catch (err) {
        expect(err.message).toEqual(
          "Unable to get user. Does this user exist?"
        );
      }
    });

    it("gets a response with all the relevant user details", async () => {
      fetch.mockResponseOnce(JSON.stringify(userDataMock), { status: 200 });
      const userData = await getUserById(userIdMock, tokenMock);

      expect(userData).toEqual(userDataMock);
    });
  });
  
  describe("Profile Page - POST requests", () => {
    test.todo("Creates a POST request and ensure 200 status", async () => {});

    test.todo("rejects with an error if status is not 201", async () => {});

    test.todo(
      "the update bio request contains a string & a token",
      async () => {}
    );
    test.todo(
      "the update currentLocation request contains a string & a token",
      async () => {}
    );
    test.todo(
      "the update workplace request contains a string & a token",
      async () => {}
    );
    test.todo(
      "the update education request contains a string & a token",
      async () => {}
    );
  });
});
