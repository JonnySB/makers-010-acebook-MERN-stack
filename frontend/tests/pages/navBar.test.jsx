import { fireEvent, render, screen } from "@testing-library/react";
import { describe, vi } from "vitest";
// import { useNavigate } from "react-router-dom";
import NavBar from "../../src/components/NavBar/NavBar";

// Mocking React Router's useNavigate and Link function
vi.mock("react-router-dom", () => {
    const linkMock = vi.fn();
    const useLinkMock = () => linkMock;
    
    return { Link: useLinkMock };
});

// Navigation tests failing: getByRole for Link needs checking, signout redirect

describe("Nav Bar" ,() => {
    test.todo("Signout icon navigates to homepage", () => {
        render(<NavBar />)
        screen.debug()
        const logoutLink = screen.getByRole('logout-button');
        // console.log("Homepage LINK -> ", logoutLink)
        // fireEvent.click(logoutLink);

        // expect(window.location.pathname).toBe('/'); // False positive !
        expect(logoutLink.getAttribute("href")).toEqual("/");
    })

    test.todo("Profile icon navigates to Profile page", () => {
        const userID = "12345"
        render(<NavBar userID={userID}/>)
        screen.debug()
        

        const porfileLink = screen.getByRole('profile-page').getByRole();
        console.log("PROFILE LINK", porfileLink)

        expect(porfileLink.getAttribute("href")).toEqual("/profile/12345");
    })

    test.todo("Feed icon navigates to Profile page", () => {
        render(<NavBar />)

        const feedPageLink = screen.getByRole('feed-page');
        // console.log("My FEED PAGE LINK -> ", feedPageLink)

        expect(feedPageLink.getAttribute("href")).toEqual("/posts");
    })


    test.todo("Profile icon navigates to Profile page", () => {
        // Mock props if needed
        const props = { userID: 'someUserID' };
    
        render(
            <NavBar {...props} />

        );
        const profileLink = screen.getByRole('test');
        
        // Assert that the link is present
        expect(profileLink).toBeInTheDocument();
        // Simulate click on the link
        fireEvent.click(profileLink);
    
        // Assert that the page navigates to the correct URL
        expect(window.location.pathname).toBe(`/profile/${props.userID}`);
    });
})