import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import '@testing-library/jest-dom';
import { MemoryRouter } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/authContext/index.js";
import Sidebar from "../components/Sidebar.js";

jest.mock("../contexts/authContext/index.js", () => ({
  useAuth: jest.fn(),
}));

const mockSignOut = jest.fn();
jest.mock("../firebase/auth.js", () => ({
  doSignOut: mockSignOut,
}));

jest.mock("@fortawesome/react-fontawesome", () => ({
  FontAwesomeIcon: () => <span />,
}));

const mockNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockNavigate,
}));

describe("Sidebar Component", () => {
  afterEach(() => {
    jest.resetAllMocks();
  });


  test("renders gg logo on the sidebar", () => {
    useAuth.mockReturnValue({
      currentUser: { name: "Test User" },
      userLoggedIn: true,
    });

    render(
      <MemoryRouter>
        <Sidebar activePage="home" />
      </MemoryRouter>
    );

    const logo = screen.getByRole("heading");
    expect(logo).toBeDefined();
  });

  test("navigates to the correct route on menu item click", () => {
    useAuth.mockReturnValue({
      currentUser: { name: "Test User" },
      userLoggedIn: true,
    });

    render(
      <MemoryRouter>
        <Sidebar activePage="home" />
      </MemoryRouter>
    );

    const button = screen.getByLabelText('Lounges');
    fireEvent.click(button);

    expect(mockNavigate).toHaveBeenCalledWith("/lounge");
  });
});
