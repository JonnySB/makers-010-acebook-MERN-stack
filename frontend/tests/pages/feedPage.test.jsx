import { render, screen } from "@testing-library/react";
import { describe, vi } from "vitest";

import { FeedPage } from "../../src/pages/Feed/FeedPage";
import { getPosts } from "../../src/services/posts";
import { useNavigate } from "react-router-dom";

// Mocking the getPosts service
vi.mock("../../src/services/posts", () => {
    const getPostsMock = vi.fn();
    return { getPosts: getPostsMock };
});

// Mocking React Router's useNavigate function
vi.mock("react-router-dom", () => {
    const navigateMock = vi.fn();
    const useNavigateMock = () => navigateMock; // Create a mock function for useNavigate
    const linkMock = vi.fn();
    const useLinkMock = () => linkMock;
    return { useNavigate: useNavigateMock, Link: useLinkMock };
});

describe("Feed Page", () => {
    beforeEach(() => {
        window.localStorage.removeItem("token");
    });

    const mockPosts = [{
        _id: "12345",
        message: "Test Post 1",
        createdAt: "2024-02-01T16:50:30.870Z",
        likes: [],
        comments: [{
            owner_firstName: [{}],
        }],
        user_data: [{
            username: "user",
            firstName: "Bob",
            lastName: "Smith"
        }]
    }];

    describe("It gets posts from the backend", () => {
        window.localStorage.setItem("token", "testToken");
        getPosts.mockResolvedValue({ posts: mockPosts, token: "newToken", user_id: "userID" });
        
        render(<FeedPage />);
        test("It displays the Post and Like components", () => {
            const post = screen.getByRole("singlePostContent");
            const like = screen.getByRole("likeDiv");
            expect(post).toBeInTheDocument();;
            expect(like).toBeInTheDocument();
        });
    });

    test("It displays the CreatePost component", () => {
        window.localStorage.setItem("token", "testToken");
        render(<FeedPage />);
            const createPost = screen.getByRole("createPostDiv");
            expect(createPost).toBeInTheDocument();
    });

    test("It navigates to login if no token is present", async () => {
        render(<FeedPage />);
        const navigateMock = useNavigate();
        expect(navigateMock).toHaveBeenCalledWith("/");
    });
});
