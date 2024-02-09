import createFetchMock from "vitest-fetch-mock";
import { describe, expect, vi } from "vitest";

import {
  getUserById,
  updateBio,
  updateCurrentLocation,
  updateWorkplace,
  updateEducation,
} from "../../src/services/users";
import { stringify } from "postcss";
// import { updateCurrentLocation } from "../../../api/controllers/users";

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

const tokenMock = {
  user_id: "123",
};
const userIdMock = "123";

describe("User service", () => {
  describe("find user - GET request", () => {
    test("includes a token and userId with its request", async () => {
      fetch.mockResponseOnce(JSON.stringify({}), { status: 200 });

      await getUserById(userIdMock, "testToken");

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
      const userData = await getUserById(userIdMock, "testToken");

      expect(userData).toEqual(userDataMock);
    });
  });

  describe("Profile Page - POST requests", () => {
    describe("Update Bio", () => {
      test("the update bio request contains a string & a token", async () => {
        fetch.mockResponseOnce(JSON.stringify({}), { status: 200 });

        await updateBio("I love acebook", tokenMock);

        const fetchArguments = fetch.mock.lastCall;
        const url = fetchArguments[0];
        const options = fetchArguments[1];

        expect(url).toEqual(`${BACKEND_URL}/users/123/bio`);
        expect(options.method).toEqual("POST");
        expect(options.headers["Authorization"]).toEqual(`Bearer ${tokenMock}`);
        expect(options.body).toContain("I love acebook");
      });

      it("rejects with an error if status is not 201", async () => {
        fetch.mockResponseOnce(JSON.stringify({}), { status: 400 });

        try {
          await updateBio("I love acebook", tokenMock);
        } catch (err) {
          expect(err.message).toEqual("Couldn't update bio");
        }
      });
    });

    describe("Update current location", () => {
      test("the update currentLocation request contains a string & a token", async () => {
        fetch.mockResponseOnce(JSON.stringify({}), { status: 200 });

        await updateCurrentLocation("London", tokenMock);

        const fetchArguments = fetch.mock.lastCall;
        const url = fetchArguments[0];
        const options = fetchArguments[1];

        expect(url).toEqual(`${BACKEND_URL}/users/123/currentLocation`);
        expect(options.method).toEqual("POST");
        expect(options.headers["Authorization"]).toEqual(`Bearer ${tokenMock}`);
        expect(options.body).toContain("London");
      });

      it("rejects with an error if status is not 201", async () => {
        fetch.mockResponseOnce(JSON.stringify({}), { status: 400 });

        try {
          await updateCurrentLocation("London", tokenMock);
        } catch (err) {
          expect(err.message).toEqual("Couldn't update current location");
        }
      });
    });

    describe("Update workplace", () => {
      test("the update workplace request contains a string & a token", async () => {
        fetch.mockResponseOnce(JSON.stringify({}), { status: 200 });

        await updateWorkplace("Makers", tokenMock);

        const fetchArguments = fetch.mock.lastCall;
        const url = fetchArguments[0];
        const options = fetchArguments[1];

        expect(url).toEqual(`${BACKEND_URL}/users/123/workplace`);
        expect(options.method).toEqual("POST");
        expect(options.headers["Authorization"]).toEqual(`Bearer ${tokenMock}`);
        expect(options.body).toContain("Makers");
      });

      it("rejects with an error if status is not 201", async () => {
        fetch.mockResponseOnce(JSON.stringify({}), { status: 400 });

        try {
          await updateWorkplace("Makers", tokenMock);
        } catch (err) {
          expect(err.message).toEqual("Couldn't update workplace");
        }
      });
    });

    describe("Update education", () => {
      test("the update education request contains a string & a token", async () => {
        fetch.mockResponseOnce(JSON.stringify({}), { status: 200 });

        await updateEducation("School of hard knocks", tokenMock);

        const fetchArguments = fetch.mock.lastCall;
        const url = fetchArguments[0];
        const options = fetchArguments[1];

        expect(url).toEqual(`${BACKEND_URL}/users/123/education`);
        expect(options.method).toEqual("POST");
        expect(options.headers["Authorization"]).toEqual(`Bearer ${tokenMock}`);
        expect(options.body).toContain("School of hard knocks");
      });

      it("rejects with an error if status is not 201", async () => {
        fetch.mockResponseOnce(JSON.stringify({}), { status: 400 });

        try {
          await updateEducation("Makers", tokenMock);
        } catch (err) {
          expect(err.message).toEqual("Couldn't update education");
        }
      });
    });
  });
});
