import { render, screen } from "@testing-library/react";
import { describe, vi } from "vitest";

import { ProfilePage } from "../../src/pages/Profile/ProfilePage";
import { getUserById } from "../../src/services/users";
import { useNavigate } from "react-router-dom";

// Mocking the getPosts service
vi.mock("../../src/services/users", () => {
  const getUserByIdMock = vi.fn();
  return { getUserById: getUserByIdMock };
});

// Mocking React Router's useNavigate function
vi.mock("react-router-dom", () => {
  const navigateMock = vi.fn();
  const useNavigateMock = () => navigateMock; // Create a mock function for useNavigate
  return { useNavigate: useNavigateMock };
});
