import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, test, vi } from "vitest";

import * as servicesPost from "../../src/services/posts";
import Like from "../../src/components/Post/Like";

let testPost = {
  _id: "12345",
  message: "Test Post 1",
  createdAt: "2024-02-01T16:50:30.870Z",
  likes: [],
  comments: [],
  user_data: [{
      username: "user",
      firstName: "Bob",
      lastName: "Smith"
  }]
};

const testUserID = "1234";

describe("Like component renders correctly", () => {
  test("Like component renders all elements", () => {
    render(<Like likes={testPost.likes} userID={testUserID}/>);
    expect(screen.getByRole("likeDiv")).toBeInTheDocument();
    expect(screen.getByRole("likeButton")).toBeInTheDocument();
    expect(screen.getByRole("likeNumber")).toBeInTheDocument(); 
    expect(screen.getByRole("likeIcon")).toBeInTheDocument(); 
  });
});

describe("Like component user clicks", () => {
  const postLike = vi.spyOn(servicesPost, 'postLike').mockResolvedValue({});
  const postUnlike = vi.spyOn(servicesPost, 'postUnlike').mockResolvedValue({});

  test("If not liked, postLike is called", async () => {    
    render(<Like likes={testPost.likes} userID={testUserID}/>)
    const likeButton = screen.getByRole("likeButton");
    userEvent.click(likeButton);
    await waitFor(() => {
      expect(postLike).toHaveBeenCalled();
    });
  });

  test("If liked, postUnlike is called", async () => {
    testPost.likes.push(testUserID);    
    render(<Like likes={testPost.likes} userID={testUserID}/>)
    const likeButton = screen.getByRole("likeButton");
    userEvent.click(likeButton);
    await waitFor(() => {
      expect(postUnlike).toHaveBeenCalled();
    });
  });
});