import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { vi } from "vitest";
import { createPosts } from "../../src/services/posts";
import CreatePost from "../../src/components/Post/CreatePost";

describe("Create Post component renders correctly", () => {
  test("CreatePost component renders all elements", () => {
    render(<CreatePost />);
    expect(screen.getByPlaceholderText("Enter your post here...")).to.exist;
    expect(screen.getByRole("submit-button")).to.exist;
    expect(screen.getByRole("submit-button")).to.have.property(
      "value",
      "Create Post"
    );
    expect(screen.getByRole("form")).to.exist;
    expect(screen.getByLabelText("Create New Post Form")).to.exist;
  });
});

const completeCreatePostForm = async () => {
  const user = userEvent.setup();
  const textAreaEl = screen.getByPlaceholderText("Enter your post here...");
  await user.type(textAreaEl, "Hello World");
};

describe("Create Post component functions correctly", () => {
  test("User can input text into textarea", async () => {
    render(<CreatePost />);

    await completeCreatePostForm();
    expect(
      screen.getByPlaceholderText("Enter your post here...")
    ).to.have.property("value", "Hello World");
  });

  // Not sure how to mock or test for this
//   test("User can submit post", async () => {
//     render(<CreatePost />);
//     const spy = vi.spyOn(createPosts).mockImplementation(() => true);
//     await completeCreatePostForm();
//     const submitButtonEl = screen.getByRole("submit-button");
//     userEvent.click(submitButtonEl);
//     await waitFor(() => {
//       expect(spy).toHaveBeenCalled();
//     });
//     spy.mockRestore(); 
//   });
});
