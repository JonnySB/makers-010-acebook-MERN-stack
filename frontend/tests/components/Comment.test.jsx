import { render, screen } from "@testing-library/react";
import Comment from "../../src/components/CommentModal/Comment";

describe("Comment component tests", () => {
  const message = "This is a message";
  const createdAt = "";
  const owner = "1234";
  const owner_firstName = "firstname";
  const owner_lastName = "lastname";
  const owner_username = "username";

  test("displays the content(message) as a paragraph", () => {
    render(
      <Comment
        message={message}
        createdAt={createdAt}
        owner={owner}
        owner_firstName={owner_firstName}
        owner_lastName={owner_lastName}
        owner_username={owner_username}
      />,
    );

    const paragraph = screen.getByRole("singleCommentContent");
    expect(paragraph.textContent).toEqual("This is a message");

    const span = screen.getByRole("commenterFullDisplayName");
    expect(span.textContent).toEqual("firstname lastname");
    // TODO: Should probably check that the names are also next to the post
  });
});
