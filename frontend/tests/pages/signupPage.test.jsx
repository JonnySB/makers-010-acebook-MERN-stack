import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
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
  const submitButtonEl = screen.getByRole("submit-button");

  await user.type(usernameInputEl, "testusername");
  await user.type(dobInputEl, "2009-10-10");
  await user.type(emailInputEl, "test@email.com");
  await user.type(passwordInputEl, "1234");
  await user.click(submitButtonEl);
};

describe("Signup Page", () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  test("allows a user to signup", async () => {
    render(<SignupPage />);

    await completeSignupForm();

    expect(signup).toHaveBeenCalledWith("testusername", "2009-10-10","test@email.com", "1234");
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


  // password validator test
  // test("displays error message for invalid password - missing special character and number", () => {
  //   render(<SignupPage />);

  //   const passwordInputEl = screen.getByLabelText("Password");

  //   userEvent.type(passwordInputEl, "Password1!");

  //   const errorMessageEl = screen.getByTestId("invalid-password");
  //   console.log("Start - This is the what it returns when NOT using textContent:")
  //   console.log(errorMessageEl);
  //   console.log("End - This is the what it returns when using textContent")
  //   console.log(" ")
  //   console.log("This is the what it returns when using textContent:")
  //   console.log(errorMessageEl.textContent);

  //   expect(errorMessageEl.textContent).toBe("Password is invalid!");
  //   // expect(errorMessageEl).toBe("Password is invalid!");
  //   // console.log(expect(errorMessageEl).toBeTruthy());
  // });



  // test("displays success message for valid password", () => {
  //   render(<SignupPage />);

  //   const passwordInputEl =  screen.getByTestId("TEST");
  //   console.log(passwordInputEl);
  //   userEvent.type(passwordInputEl, "ValidPassword1!");
  //   const successMessageEl = screen.getByTestId("valid-password");

  //   console.log("This is the what it returns when NOT using textContent:");
  //   console.log(successMessageEl);
  //   console.log("This is the what it returns:");
  //   console.log(successMessageEl.textContent);

  //   expect(successMessageEl.textContent).toBe("Password is valid!");
  // });
});
