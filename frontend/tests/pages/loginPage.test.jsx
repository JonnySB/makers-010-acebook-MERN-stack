import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { expect, vi } from "vitest";

import { useNavigate } from "react-router-dom";
import { login } from "../../src/services/authentication";

import { LoginPage } from "../../src/pages/Login/LoginPage";

// Mocking React Router's useNavigate function
vi.mock("react-router-dom", () => {
    const navigateMock = vi.fn();
    const useNavigateMock = () => navigateMock; // Create a mock function for useNavigate

    const linkMock = vi.fn();
    const useLinkMock = () => linkMock;
    
    // don't just assume this is OK
    return { useNavigate: useNavigateMock, Link: useLinkMock };
});

// Mocking the login service
vi.mock("../../src/services/authentication", () => {
    const loginMock = vi.fn();
    return { login: loginMock };
});

// Reusable function for filling out login form
const completeLoginForm = async () => {
    const user = userEvent.setup();

    const emailInputEl = screen.getByLabelText("Your email");
    const passwordInputEl = screen.getByLabelText("Password");
    const submitButtonEl = screen.getByRole("submit-button");

    await user.type(emailInputEl, "test@email.com");
    await user.type(passwordInputEl, "1234");
    await user.click(submitButtonEl);
};

describe("Login Page", () => {
    beforeEach(() => {
        vi.resetAllMocks();
    });

    test("allows a user to login", async () => {
        render(<LoginPage />);

        await completeLoginForm();

        expect(login).toHaveBeenCalledWith("test@email.com", "1234");
    });

    test("navigates to /posts on successful login", async () => {
        render(<LoginPage />);

        login.mockResolvedValue("secrettoken123");
        const navigateMock = useNavigate();

        await completeLoginForm();

        expect(navigateMock).toHaveBeenCalledWith("/posts");
    });

    test("navigates to / on unsuccessful login", async () => {
        render(<LoginPage />);

        login.mockRejectedValue(new Error("Error logging in"));
        const navigateMock = useNavigate();

        await completeLoginForm();

        expect(navigateMock).toHaveBeenCalledWith("/");
    });
});

describe("Login - unsuccessful", () => {
    beforeEach(() => {
        vi.resetAllMocks();
    });

    test.todo("User cannot login if the email and password do not match", async () => {
        render(<LoginPage />);
        const emailInputEl = screen.getByLabelText("Your email");
        const passwordInputEl = screen.getByLabelText("Password");

        const submitButtonEl = screen.getByRole("submit-button");

        await userEvent.type(emailInputEl, "test@email.com");
        await userEvent.type(passwordInputEl, "12345");

        // console.log("THE PASSWORD BEFORE -> ", passwordInputEl)

        await userEvent.click(submitButtonEl);
        const validationError = screen.queryByText(/Make sure email and password are correct/);
        // console.log("VALIDATION ERROR IN LOGIN -> ", validationError)
        // console.log("THE PASSWORD AFTER -> ", passwordInputEl)
        expect(validationError !== null).toBe(true)

    });
});

