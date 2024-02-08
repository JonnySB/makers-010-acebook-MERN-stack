import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { expect, vi } from "vitest";
import * as servicesPost from "../../src/services/posts";
import CreateComment from "../../src/components/CommentModal/CreateComment";

describe("Comment component tests", () => {
  test("displays the content(message) as a paragraph", () => {
    render(<CreateComment />);

    expect(
      screen.getByPlaceholderText("Write a comment..."),
    ).toBeInTheDocument();
    expect(screen.getByRole("createCommentSubmitButton")).toBeInTheDocument();
    expect(screen.getByRole("createCommentSubmitButton")).toHaveTextContent(
      "Add Comment",
    );
    expect(screen.getByRole("form")).toBeInTheDocument();
    expect(
      screen.getByLabelText("Create New Comment Form"),
    ).toBeInTheDocument();
  });
});

// Reuseable code for user text submission so that it doesn't need to be
// rewritten multiple times in the test below
const completeCreateCommentForm = async () => {
  const user = userEvent.setup();
  const textAreaEl = screen.getByPlaceholderText("Write a comment...");
  await user.type(textAreaEl, "Hello World");
};

describe("Create comment component functions correctly", () => {
  beforeEach(() => {
    createCommentsSpy.mockClear();
  });

  const createCommentsSpy = vi
    .spyOn(servicesPost, "createComment")
    .mockResolvedValue({});

  //TODO: props.setToken isn't a function. Maybe need to create a mock?
  test("When a user fills out the comments's text field and clicks the button, it calls the createComment method with a token and a string", async () => {
    const mockToken = "testToken";
    const mockPostID = "1234";

    render(<CreateComment token={mockToken} post_id={mockPostID} />);
    await completeCreateCommentForm();
    const submitButtonEl = screen.getByRole("createCommentSubmitButton");
    userEvent.click(submitButtonEl);
    await waitFor(() => {
      expect(createCommentsSpy).toHaveBeenCalled();
      expect(createCommentsSpy).toHaveBeenCalledWith(
        mockToken,
        mockPostID,
        "Hello World",
      );
    });
  });

  // This test implementation only tests that createComments method hasn't been called
  // As the validation has been delegated to <textarea required> rather than our own checks
  // TODO: Discuss if we are ok with using <textarea required>
  test("User can't submit a post that's empty", async () => {
    render(<CreateComment />);
    const submitButtonEl = screen.getByRole("createCommentSubmitButton");
    userEvent.click(submitButtonEl);
    await waitFor(() => {
      expect(createCommentsSpy).not.toHaveBeenCalled();
    });
  });
});
