import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, test, vi } from "vitest";
import Intro from "../../../src/components/Profile/Intro";
import * as userServices from "../../../src/services/users";
import { ProfilePage } from "../../../src/pages/Profile/ProfilePage";

const basicProfileInfoMock = {
  username: "test",
  dob: new Date("1999-06-16T00:00:00.000Z"),
  friends: [],
};

const loadedProfileInfoMock = {
  username: "test-loaded",
  dob: new Date("1999-06-16T00:00:00.000Z"),
  friends: [],
  bio: "I love acebook",
  education: "School of hard knocks",
  workplace: "Makers",
  currentLocation: "London",
};

describe("Intro component renders conditionally", () => {
  test("When profile belongs to the owner but has no info", () => {
    render(<Intro profileInfo={basicProfileInfoMock} profileOwner={true} />);

    expect(screen.getByRole("heading")).toHaveTextContent("Intro");
    expect(screen.getByRole("button", { name: "Add Bio" })).toBeInTheDocument();
    expect(screen.getByText("June 16, 1999")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Edit details" })
    ).toBeInTheDocument();
  });

  test("When profile belongs to the owner but has info", () => {
    render(<Intro profileInfo={loadedProfileInfoMock} profileOwner={true} />);

    expect(screen.getByRole("heading")).toHaveTextContent("Intro");
    expect(screen.getByText("I love acebook")).toBeInTheDocument();
    expect(screen.getByText("School of hard knocks")).toBeInTheDocument();
    expect(screen.getByText("Makers")).toBeInTheDocument();
    expect(screen.getByText("London")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Edit details" })
    ).toBeInTheDocument();
  });

  test("When profile doesn't belong to the owner but has info", () => {
    render(<Intro profileInfo={loadedProfileInfoMock} profileOwner={false} />);

    expect(
      screen.queryByRole("button", { name: "Add Bio" })
    ).not.toBeInTheDocument();
    expect(screen.getByText("I love acebook")).toBeInTheDocument();
    expect(screen.getByText("School of hard knocks")).toBeInTheDocument();
    expect(screen.getByText("Makers")).toBeInTheDocument();
    expect(screen.getByText("London")).toBeInTheDocument();
    expect(
      screen.queryByRole("button", { name: "Edit details" })
    ).not.toBeInTheDocument();
  });
});

// Mock for updateBio
const updateBioSpy = vi
  .spyOn(userServices, "updateBio")
  .mockResolvedValue({ token: "newToken" });

const setTokenMock = vi.fn();
const setNewBioMock = vi.fn().mockResolvedValue({ bio: "I love acebook" });

const mockToken = "testToken";

describe("Intro component functions", () => {
  beforeEach(() => {
    updateBioSpy.mockClear();
  });

  test("When profile owner updates their bio", async () => {
    // load intro with user information without bio
    render(
      <Intro
        profileInfo={basicProfileInfoMock}
        profileOwner={true}
        token={mockToken}
        setToken={setTokenMock}
      />
    );

    const user = userEvent.setup();
    // find the add bio button and click on it
    const addBioBtn = screen.getByRole("button", { name: "Add Bio" });
    await user.click(addBioBtn);
    expect(
      screen.queryByRole("button", { name: "Add Bio" })
    ).not.toBeInTheDocument();
    expect(screen.getByRole("textbox")).toBeInTheDocument();

    const bioTxtArea = screen.getByRole("textbox");
    await user.type(bioTxtArea, "I love acebook");
    // Current implementation won't allow the below assertion to work
    // expect(bioTxtArea).toHaveTextContent("I love acebook");

    const saveBtn = screen.getByRole("button", { name: "Save" });
    await user.click(saveBtn);

    // Test to see if the function was called
    await waitFor(() => {
      expect(updateBioSpy).toHaveBeenCalled();
      expect(updateBioSpy).toHaveBeenCalledWith("I love acebook", mockToken);
      expect(setTokenMock).toHaveBeenCalledWith("newToken");
    });

    // TODO: Research how to mock useEffect from parent down to child. Seems difficult
    // expect the new updated bio to be in the document
    // expect(screen.getByText("I love acebook")).toBeInTheDocument();
    // expect(screen.getByRole("button", {name: "Edit Bio"})).toBeInTheDocument();
  });

  test.todo("When profile owner updates their details", async () => {});
});
