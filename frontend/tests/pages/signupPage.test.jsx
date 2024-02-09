import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { fireEvent } from "@testing-library/react";
import { vi } from "vitest";

import { useNavigate } from "react-router-dom";
import { signup } from "../../src/services/authentication";

import { SignupPage } from "../../src/pages/Signup/SignupPage";

// Mocking React Router's useNavigate function
vi.mock("react-router-dom", () => {
  const navigateMock = vi.fn();
  const useNavigateMock = () => navigateMock; // Create a mock function for useNavigate
  const linkMock = vi.fn();
  const useLinkMock = () => linkMock;

  // don't just assume this is OK
  return { useNavigate: useNavigateMock, Link: useLinkMock };
});

// Mocking the signup service
vi.mock("../../src/services/authentication", () => {
  const signupMock = vi.fn();
  return { signup: signupMock };
});

// Reusable function for filling out signup form
const completeSignupForm = async () => {
  const user = userEvent.setup();

  const usernameInputEl = screen.getByLabelText("Username");
  const dobInputEl = screen.getByLabelText("DOB");
  const emailInputEl = screen.getByLabelText("Your email");
  const passwordInputEl = screen.getByLabelText("Password");
  const firstNameInputEl = screen.getByLabelText("First Name");
  const lastNameInputEl = screen.getByLabelText("Last Name");
  const submitButtonEl = screen.getByRole("submit-button");

  await user.type(usernameInputEl, "testusername");
  await user.type(dobInputEl, "2009-10-10");
  await user.type(emailInputEl, "test@email.com");
  await user.type(passwordInputEl, "1234");
  await user.type(firstNameInputEl, "Jane");
  await user.type(lastNameInputEl, "Eyre");
  await user.click(submitButtonEl);
};

describe("Signup Page", () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  test("allows a user to signup", async () => {
    render(<SignupPage />);

    await completeSignupForm();

    expect(signup).toHaveBeenCalledWith(
      "testusername",
      "2009-10-10",
      "test@email.com",
      "1234",
      "Jane",
      "Eyre"
    );
  });

  test("navigates to / on successful signup", async () => {
    render(<SignupPage />);

    const navigateMock = useNavigate();

    await completeSignupForm();

    expect(navigateMock).toHaveBeenCalledWith("/");
  });

  test("navigates to /signup on unsuccessful signup", async () => {
    render(<SignupPage />);

    signup.mockRejectedValue(new Error("Error signing up"));
    const navigateMock = useNavigate();

    await completeSignupForm();

    expect(navigateMock).toHaveBeenCalledWith("/signup");
  });
});

describe("Password validation", () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  // Testing password: INVALID PASSWORDS

  test("displays password validation error for invalid password - no capitcal, number or special character", async () => {
    render(<SignupPage />);

    const passwordInputEl = screen.getByLabelText("Password");
    const submitButtonEl = screen.getByRole("submit-button");

    await userEvent.type(passwordInputEl, "weakpassword");
    await userEvent.click(submitButtonEl);

    const validationError = screen.getByText(/Password must have:/);
    expect(validationError !== null).toBe(true);
  });

  test("displays password validation error for invalid password - no special character", async () => {
    render(<SignupPage />);

    const passwordInputEl = screen.getByLabelText("Password");
    const submitButtonEl = screen.getByRole("submit-button");

    await userEvent.type(passwordInputEl, "stillWeak1");
    await userEvent.click(submitButtonEl);

    const validationError = screen.getByText(/Password must have:/);
    expect(validationError !== null).toBe(true);
  });
  test("displays password validation error for invalid password - too short", async () => {
    render(<SignupPage />);

    const passwordInputEl = screen.getByLabelText("Password");
    const submitButtonEl = screen.getByRole("submit-button");

    await userEvent.type(passwordInputEl, "www");
    await userEvent.click(submitButtonEl);

    const validationError = screen.getByText(/Password must have:/);
    expect(validationError !== null).toBe(true);
  });

  test("displays password validation error for invalid password - More than 8 chars all lowercase", async () => {
    render(<SignupPage />);

    const passwordInputEl = screen.getByLabelText("Password");
    const submitButtonEl = screen.getByRole("submit-button");

    await userEvent.type(passwordInputEl, "wwwkdlfklgdkfkflakfefeukjd");
    await userEvent.click(submitButtonEl);

    const validationError = screen.getByText(/Password must have:/);
    expect(validationError !== null).toBe(true);
  });

  test("displays password validation error is null for valid password ", async () => {
    render(<SignupPage />);

    const passwordInputEl = screen.getByLabelText("Password");
    const submitButtonEl = screen.getByRole("submit-button");

    await userEvent.type(passwordInputEl, "ThisIsValid1!");
    await userEvent.click(submitButtonEl);

    await waitFor(() => {
      const validationError = screen.queryByText(/Password must have:/);
      expect(validationError).toBeNull();
      const successMessage = screen.queryByText("Password is valid!");
      expect(successMessage).toBeTruthy();
    });
  });

  // Testing password: VALID PASSWORDS

  test("displays password validation success for valid password", async () => {
    render(<SignupPage />);

    const passwordInputEl = screen.getByLabelText("Password");
    const submitButtonEl = screen.getByRole("submit-button");

    await userEvent.type(passwordInputEl, "Password1!");
    await userEvent.click(submitButtonEl);

    const successMessage = screen.getByText("Password is valid!");
    expect(successMessage !== null).toBe(true);
  });

  // Test password: INVALID AND VALID PASSWORDS IN ONE
  test("displays password validation error for invalid password and then returns true for when password is updated to be valid", async () => {
    render(<SignupPage />);

    const passwordInputEl = screen.getByLabelText("Password");
    const submitButtonEl = screen.getByRole("submit-button");

    await userEvent.type(passwordInputEl, "stillWeak1");
    await userEvent.click(submitButtonEl);

    const validationError = screen.queryByText(/Password must have:/);

    expect(validationError !== null).toBe(true);

    await userEvent.clear(passwordInputEl);
    await userEvent.type(passwordInputEl, "isNowStrong1!");
    await userEvent.click(submitButtonEl);

    expect(screen.queryByText(/Password must have:/)).toBeNull();
    expect(screen.queryByText("Password is valid!")).toBeTruthy();
  });
});

describe("Sign up - Cannot signup with invalid password", () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });
  test("allows a user to signup with password put throught validation", async () => {
    render(<SignupPage />);
    await completeSignupForm();
    const pw = "1234";
    const passwordInputEl = screen.getByLabelText("Password");
    const submitButtonEl = screen.getByRole("submit-button");

    await userEvent.type(passwordInputEl, pw);
    await userEvent.click(submitButtonEl);

    const validationError = screen.getByText(/Password must have:/);
    expect(validationError !== null).toBe(true);
    expect(signup).toHaveBeenCalledWith(
      "testusername",
      "2009-10-10",
      "test@email.com",
      pw,
      "Jane",
      "Eyre"
    );
  });
});

describe("Sign up - If user exists or doesn't exist", () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });
  test("displays error message for existing username or email on unsuccessful signup", async () => {
    render(<SignupPage />);
    signup.mockRejectedValue({
      response: {
        data: {
          message: "Username or email already exists",
        },
      },
    });
    const navigateMock = useNavigate();
    await completeSignupForm();
    const errorElement = screen.getByText("Username or email already exists");
    expect(errorElement !== null).toBe(true);
    expect(navigateMock).toHaveBeenCalledWith("/signup");
  });

  test("successful sign up for unique user", async () => {
    render(<SignupPage />);
    signup.mockResolvedValue({
      response: {
        data: {
          message: "Username or email already exists",
        },
      },
    });
    const navigateMock = useNavigate();
    await completeSignupForm();
    const errorElement = screen.queryByText("Username or email already exists");
    expect(errorElement).toBeNull();
    expect(navigateMock).toHaveBeenCalledWith("/");
  });
});

describe("Sign up - Age limit is 13", () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  test("User cannot sign up if they are 10 years old", async () => {
    render(<SignupPage />);

    const usernameInputEl = screen.getByLabelText("Username");
    const dobInputEl = screen.getByLabelText("DOB");
    const emailInputEl = screen.getByLabelText("Your email");
    const passwordInputEl = screen.getByLabelText("Password");
    const firstNameInputEl = screen.getByLabelText("First Name");
    const lastNameInputEl = screen.getByLabelText("Last Name");

    const submitButtonEl = screen.getByRole("submit-button");

    await userEvent.type(usernameInputEl, "testusername");
    await userEvent.type(emailInputEl, "test@email.com");
    await userEvent.type(passwordInputEl, "Password1!");
    await userEvent.type(firstNameInputEl, "Jane");
    await userEvent.type(lastNameInputEl, "Eyre");
    await userEvent.type(dobInputEl, "2014-02-04");

    await userEvent.click(submitButtonEl);
    const validationError = screen.queryByText(/User must be at least 13 years old/)
    expect(validationError !== null).toBe(true);
  });

  test("User can sign up if they are 13 years old", async () => {
    render(<SignupPage />);

    const usernameInputEl = screen.getByLabelText("Username");
    const dobInputEl = screen.getByLabelText("DOB");
    const emailInputEl = screen.getByLabelText("Your email");
    const passwordInputEl = screen.getByLabelText("Password");
    const firstNameInputEl = screen.getByLabelText("First Name");
    const lastNameInputEl = screen.getByLabelText("Last Name");

    const submitButtonEl = screen.getByRole("submit-button");

    await userEvent.type(usernameInputEl, "testusername");
    await userEvent.type(emailInputEl, "test@email.com");
    await userEvent.type(passwordInputEl, "Password1!");
    await userEvent.type(firstNameInputEl, "Jane");
    await userEvent.type(lastNameInputEl, "Eyre");
    await userEvent.type(dobInputEl, "2011-02-04");

    await userEvent.click(submitButtonEl);
    screen.debug()
  
    const validationError = screen.queryByText(/User must be at least 13 years old/);
    console.log("VALIDATION ERROR -> ", validationError)
    expect(validationError !== null).toBe(false);
  });
});
