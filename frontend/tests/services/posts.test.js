import createFetchMock from "vitest-fetch-mock";
import { describe, expect, vi } from "vitest";

import { getPosts } from "../../src/services/posts";
import { createPosts } from "../../src/services/posts";
import { postLike, postUnlike } from "../../src/services/posts";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

// Mock fetch function
createFetchMock(vi).enableMocks();

describe("posts service", () => {
  describe("getPosts", () => {
    test("includes a token with its request", async () => {
      //mocks a fetch response
      fetch.mockResponseOnce(JSON.stringify({ posts: [], token: "newToken" }), {
        status: 200,
      });

      await getPosts("testToken");

      // This is an array of the arguments that were last passed to fetch
      const fetchArguments = fetch.mock.lastCall;
      const url = fetchArguments[0];
      const options = fetchArguments[1];

      expect(url).toEqual(`${BACKEND_URL}/posts`);
      expect(options.method).toEqual("GET");
      expect(options.headers["Authorization"]).toEqual("Bearer testToken");
    });

    test("rejects with an error if the status is not 200", async () => {
      fetch.mockResponseOnce(
        JSON.stringify({ message: "Something went wrong" }),
        { status: 400 }
      );

      try {
        await getPosts("testToken");
      } catch (err) {
        expect(err.message).toEqual("Unable to fetch posts");
      }
    });
  });

  describe("createPost", () => {
    it("Creates a resource with a POST request and ensure 200 status code", async () => {
      fetch.mockResponseOnce(JSON.stringify({ message: "success!" }), {
        status: 201,
      });
      await createPosts("testToken", "Hello World!");
      const fetchArguments = fetch.mock.lastCall;
      const url = fetchArguments[0];
      const options = fetchArguments[1];

      expect(url).toEqual(`${BACKEND_URL}/posts`);
      expect(options.method).toEqual("POST");
      expect(options.headers["Authorization"]).toEqual("Bearer testToken");
      expect(options.body).toContain("Hello World")
    });

    it("rejects with an error if the status is not 201", async () => {
      fetch.mockResponseOnce(
        JSON.stringify({ message: "Something went wrong" }),
        { status: 400 }
      );

      try {
        await createPosts("testToken", "Hello World");
      } catch (err) {
        expect(err.message).toEqual(
          "Unable to make POST request for fetch posts"
        );
      }
    });

    // TODO:
    it.todo('creates a POST request with a token and a message', () => {
      // expect(createPosts).toHaveBeenCalledWith("Hello World!")
    })
  });

  describe("postLike", () => {
    it("Creates a resource with a POST request and ensure 200 status code", async () => {
      fetch.mockResponseOnce(JSON.stringify({ message: "success!" }), {
        status: 201,
      });
      await postLike("testToken", "testPostID");
      const fetchArguments = fetch.mock.lastCall;
      const url = fetchArguments[0];
      const options = fetchArguments[1];

      expect(url).toEqual(`${BACKEND_URL}/posts/likes`);
      expect(options.method).toEqual("POST");
      expect(options.headers["Authorization"]).toEqual("Bearer testToken");
    });

    it("rejects with an error if the status is not 201", async () => {
      fetch.mockResponseOnce(
        JSON.stringify({ message: "Something went wrong" }),
        { status: 400 }
      );

      try {
        await postLike("testToken", "testPostID");
      } catch (err) {
        expect(err.message).toEqual("Unable to like");
      }
    });
  });

  describe("postUnlike", () => {
    it("Creates a resource with a POST request and ensure 200 status code", async () => {
      fetch.mockResponseOnce(JSON.stringify({ message: "success!" }), {
        status: 201,
      });
      await postUnlike("testToken", "testPostID");
      const fetchArguments = fetch.mock.lastCall;
      const url = fetchArguments[0];
      const options = fetchArguments[1];

      expect(url).toEqual(`${BACKEND_URL}/posts/unlike`);
      expect(options.method).toEqual("POST");
      expect(options.headers["Authorization"]).toEqual("Bearer testToken");
    });

    it("rejects with an error if the status is not 201", async () => {
      fetch.mockResponseOnce(
        JSON.stringify({ message: "Something went wrong" }),
        { status: 400 }
      );

      try {
        await postUnlike("testToken", "testPostID");
      } catch (err) {
        expect(err.message).toEqual("Unable to unlike");
      }
    });
  });
});
