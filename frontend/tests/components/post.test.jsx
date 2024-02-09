import { render, screen } from "@testing-library/react";
import Post from "../../src/components/Post/Post";
import { Link } from "react-router-dom";

describe("Post component tests", () => {
  const testPost = {
    _id: "12345",
    message: "Test Post 1",
    createdAt: "2024-02-01T16:50:30.870Z",
    likes: [],
    comments: [{
      owner_firstName: [{}],
    }],
    user_data: [
      {
        username: "user",
        firstName: "Bob",
        lastName: "Smith",
      },
    ],
  };

  test("displays the content(message) as a paragraph", () => {
    render(<Post post={testPost} actionButtons={true} />);
    const paragraph = screen.getByRole("singlePostContent");
    expect(paragraph.textContent).toEqual("Test Post 1");
    // TODO: Should probably check that the names are also next to the post
  });
});
