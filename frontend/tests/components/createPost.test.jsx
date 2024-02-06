import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { expect, vi } from "vitest";
import * as servicesPost from "../../src/services/posts";
import CreatePost from "../../src/components/Post/CreatePost";

describe("CreatePost component renders correctly", () => {
  test("CreatePost component renders all elements", () => {
    render(<CreatePost />);
    expect(screen.getByPlaceholderText("Write a post...")).toBeInTheDocument();
    expect(screen.getByRole("createPostSubmitButton")).toBeInTheDocument();
    expect(screen.getByRole("createPostSubmitButton")).toHaveTextContent(
      "Create Post"
    );
    expect(screen.getByRole("form")).toBeInTheDocument();
    expect(screen.getByLabelText("Create New Post Form")).toBeInTheDocument();
  });
});

// Reuseable code for user text submission so that it doesn't need to be
// rewritten multiple times in the test below
const completeCreatePostForm = async () => {
  const user = userEvent.setup();
  const textAreaEl = screen.getByPlaceholderText("Write a post...");
  await user.type(textAreaEl, "Hello World");
};

describe("Create Post component functions correctly", () => {
  beforeEach(() => {
    createPostsSpy.mockClear();
  });

  const createPostsSpy = vi
    .spyOn(servicesPost, "createPosts")
    .mockResolvedValue({});

  //TODO: props.setToken isn't a function. Maybe need to create a mock?
  test("When a user fills out the post's text field and clicks the button, it calls the createPost method with a token and a string", async () => {
    const mockToken = "testToken";

    render(<CreatePost token={mockToken} />);
    await completeCreatePostForm();
    expect(screen.getByPlaceholderText("Write a post...")).toHaveTextContent(
      "Hello World"
    );
    const submitButtonEl = screen.getByRole("createPostSubmitButton");
    userEvent.click(submitButtonEl);
    await waitFor(() => {
      expect(createPostsSpy).toHaveBeenCalled();
      expect(createPostsSpy).toHaveBeenCalledWith(mockToken, "Hello World");
    });
  });

  // This test implementation only tests that createPosts method hasn't been called
  // As the validation has been delegated to <textarea required> rather than our own checks
  // TODO: Discuss if we are ok with using <textarea required>
  test("User can't submit a post that's empty", async () => {
    
    render(<CreatePost />);
    const submitButtonEl = screen.getByRole("createPostSubmitButton");
    userEvent.click(submitButtonEl);
    await waitFor(() => {
      expect(createPostsSpy).not.toHaveBeenCalled();
    });
  });

  //TODO:
  test.skip("User can't submit a post that has a char length over _____", () => {

  })
});
