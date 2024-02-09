import { fireEvent, render, screen } from "@testing-library/react";
import { describe, vi } from "vitest";
// import { useNavigate } from "react-router-dom";
import NavBar from "../../src/pages/Nabvar/NavBar";

// Mocking React Router's useNavigate and Link function
vi.mock("react-router-dom", () => {
    const linkMock = vi.fn();
    const useLinkMock = () => linkMock;
    
    return { Link: useLinkMock };
});


describe("Nav Bar" ,() => {
    test("Signout icon navigates to homepage", () => {
        render(<NavBar />)

        const logoutLink = screen.getByRole('logout-button');
        // console.log("Homepage LINK -> ", logoutLink)
        // fireEvent.click(logoutLink);

        // expect(window.location.pathname).toBe('/'); // False positive !
        expect(logoutLink.getAttribute("href")).toEqual("/");
    })

    test("Profile icon navigates to Profile page", () => {
        render(<NavBar />)

        const porfileLink = screen.getByRole('profile-page');
        // console.log("My PROFILE LINK -> ", porfileLink)

        expect(porfileLink.getAttribute("href")).toEqual("/profile");
    })

    test("Feed icon navigates to Profile page", () => {
        render(<NavBar />)

        const feedPageLink = screen.getByRole('feed-page');
        // console.log("My FEED PAGE LINK -> ", feedPageLink)

        expect(feedPageLink.getAttribute("href")).toEqual("/posts");
    })
})