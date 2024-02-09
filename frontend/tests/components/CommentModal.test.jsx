import { render, screen } from "@testing-library/react";
import CommentModal from "../../src/components/CommentModal/CommentModal";
import userEvent from "@testing-library/user-event";

describe("CommentModal component tests", () => {
  const post = {
    _id: "12345",
    message: "Test Post 1",
    createdAt: "2024-02-01T16:50:30.870Z",
    likes: [],
    comments: [
      {
        message: "This is a comment",
        createdAt: "",
        owner: "123",
        owner_firstName: "john",
        owner_lastName: "doe",
        owner_username: "jdoe",
      },
    ],
    user_data: [
      {
        username: "user",
        firstName: "Bob",
        lastName: "Smith",
      },
    ],
  };
  const commentOn = true;

  test("A post with comments is displayed correctly", async () => {
    render(<CommentModal post={post} commentOn={commentOn} />);
    const submitButtonEl = screen.getByRole("modalBtn");
    await userEvent.click(submitButtonEl);

    const message = screen.getByRole("singlePostContent");
    expect(message.textContent).toEqual(post.message);

    screen.debug();

    const commentMessage = screen.getByRole("singleCommentContent");
    expect(commentMessage.textContent).toEqual(post.comments[0].message);

    const commentOwner = screen.getByRole("commenterFullDisplayName");
    expect(commentOwner.textContent).toEqual("john doe");
  });
});
