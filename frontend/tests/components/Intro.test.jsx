import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, test, vi } from "vitest";

describe("Intro component tests", () => {
  const profileInfo = {
    username: "test",
    dob: new Date("1999-06-16T00:00:00.000Z"),
    friends: [],
  };

  test("Intro heading renders correctly", () => {
    render(<Intro profileInfo={profileInfo}/>);
    expect(screen.getByRole("heading")).toHaveTextContent("Intro");
  });

  test("Initially just renders the user's birthday", () => {
    render(<Intro profileInfo={profileInfo} />);
    expect(screen.getByRole("birthday")).toHaveTextContent("16th June 1999");
  });
});
