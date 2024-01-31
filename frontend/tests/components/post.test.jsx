import { render, screen } from "@testing-library/react";
import Post from "../../src/components/Post/Post";
import CreatePost from "../../src/components/CreatePost/CreatePost";

describe("Post", () => {
  test("displays the message as an article", () => {
    const testPost = { _id: "123", message: "test message" };
    render(<Post post={testPost} />);

    const article = screen.getByRole("article");
    expect(article.textContent).toBe("test message");
  });

  test("displays CreatePost as a form", () => {
    render(<CreatePost />);
    expect(screen.getByPlaceholderText("Enter your post here...")).to.exist; 
    expect(screen.getByLabelText("form")).to.exist; 
    expect(screen.getByRole("button")).to.exist; 
    expect(screen.getByRole("form")).to.exist;
    expect(screen.getByLabelText("Create New Post Form")).to.exist; 
  });

  test("User can input text into textarea", () => {
    expect;
  });

  test("User can create a post", () => {
    expect;
  });
});
