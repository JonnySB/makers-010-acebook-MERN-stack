import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { vi } from "vitest";

import { useNavigate } from "react-router-dom";
import { login } from "../../src/services/authentication";

import { NavBar } from "../../src/pages/Nabvar/NavBar";

// Mocking React Router's useNavigate function
vi.mock("react-router-dom", () => {
    const navigateMock = vi.fn();
    const useNavigateMock = () => navigateMock; // Create a mock function for useNavigate

    const linkMock = vi.fn();
    const useLinkMock = () => linkMock;
    
    // don't just assume this is OK
    return { useNavigate: useNavigateMock, Link: useLinkMock };
});