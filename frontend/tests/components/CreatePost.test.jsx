import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { vi } from "vitest";
import { createPosts } from "../../src/services/posts";
import CreatePost from "../../src/components/Post/CreatePost";

describe("Create Post component renders correctly", () => {
  test("CreatePost component renders all elements", () => {
    render(<CreatePost />);
    expect(screen.getByPlaceholderText("Write a post...")).to.exist;
    expect(screen.getByRole("submit-button")).to.exist;
    expect(screen.getByRole("submit-button")).to.have.property(
      "textContent",
      "Create Post"
    );
    expect(screen.getByRole("form")).to.exist;
    expect(screen.getByLabelText("Create New Post Form")).to.exist;
  });
});

const completeCreatePostForm = async () => {
  const user = userEvent.setup();
  const textAreaEl = screen.getByPlaceholderText("Write a post...");
  await user.type(textAreaEl, "Hello World");
};

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
    expect(screen.getByPlaceholderText("Write a post...")).to.have.property(
      "value",
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

  test("User can't submit a post that's empty", async () => {
    // const consoleLogSpy = vi.spyOn(console, "error");
    render(<CreatePost />);
    const submitButtonEl = screen.getByRole("submit-button");
    userEvent.click(submitButtonEl);
    // expect(consoleLogSpy).toHaveBeenCalled();
    expect(createPosts).not.toHaveBeenCalled();
    // consoleLogSpy.mockReset();
  });
});
