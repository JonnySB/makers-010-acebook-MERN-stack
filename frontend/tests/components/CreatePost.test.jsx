import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { vi } from "vitest";
import { createPosts } from "../../src/services/posts";
import CreatePost from "../../src/components/Post/CreatePost";

describe("Create Post component renders correctly", () => {
  test("CreatePost component renders all elements", () => {
    render(<CreatePost />);
    expect(screen.getByPlaceholderText("Write a post...")).toBeInTheDocument();
    expect(screen.getByRole("submit-button")).toBeInTheDocument();
    expect(screen.getByRole("submit-button")).toHaveTextContent("Create Post");
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

// Needed to create a mock for services/createPosts 
// to only unit test the submit button works and calls the correct function
// and not the fetch request
vi.mock("../../src/services/posts", () => {
  const createPostsMock = vi.fn(() =>
    console.log("createdPostsMock was called")
  );
  return {
    createPosts: createPostsMock,
  };
});

describe("Create Post component functions correctly", () => {
  beforeEach(() => {
    createPosts.mockReset();
  });

  test("User can input text into textarea", async () => {
    render(<CreatePost />);

    await completeCreatePostForm();
    expect(screen.getByPlaceholderText("Write a post...")).toHaveTextContent(
      "Hello World"
    );
  });

  it("calls the createPosts function when user clicks button", async () => {
    render(<CreatePost />);
    await completeCreatePostForm();
    const submitButtonEl = screen.getByRole("submit-button");
    userEvent.click(submitButtonEl);
    await waitFor(() => {
      expect(createPosts).toHaveBeenCalled();
    });
  });

  // This test implementation only tests that services/createPosts hasn't been called
  // Haven't discussed the sort of error the user should recieve
  test("User can't submit a post that's empty", async () => {
    // const logSpy = vi.spyOn(console, 'error')
    render(<CreatePost />);
    const submitButtonEl = screen.getByRole("submit-button");
    userEvent.click(submitButtonEl);
    await waitFor(() => {
      expect(createPosts).not.toHaveBeenCalled();
      // expect(logSpy).toHaveBeenCalled();
    });
  });
});
