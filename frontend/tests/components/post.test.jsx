import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Post from "../../src/components/Post/Post";
import CreatePost from "../../src/components/Post/CreatePost";

describe("Post", () => {
  test("displays the message as an article", () => {
    const testPost = { _id: "123", message: "test message" };
    render(<Post post={testPost} />);

    const article = screen.getByRole("article");
    expect(article).toHave("test message");
  });

  test("displays CreatePost as a form", () => {
    render(<CreatePost />);
    expect(screen.getByPlaceholderText("Enter your post here...")).to.exist; 
    expect(screen.getByRole("submit-button")).to.exist; 
    expect(screen.getByRole("submit-button")).to.have.property('value', 'Create Post');
    expect(screen.getByRole("form")).to.exist;
    expect(screen.getByLabelText("Create New Post Form")).to.exist; 
  });

  test("User can input text into textarea", async () => {
    const user = userEvent.setup();
    render(<CreatePost />); 
    const textAreaEl = screen.getByPlaceholderText("Enter your post here...")
    await user.type(textAreaEl, "Hello World");
  });
}); 