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

  test("renders all menu items and highlights the home page", () => {
    useAuth.mockReturnValue({
      currentUser: { name: "Test User" },
      userLoggedIn: true,
    });

    render(
      <MemoryRouter>
        <Sidebar activePage="home" />
      </MemoryRouter>
    );
    const menuItems = screen.getAllByTestId("button");
    expect(menuItems).toHaveLength(7);

    const activeMenu = menuItems[0];
    const homeButton = screen.getByLabelText("Home")
    expect(activeMenu).toBe(homeButton);
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

  test("calls the sign-out function on logout click", async () => {
    useAuth.mockReturnValue({
      currentUser: { name: "Test User" },
      userLoggedIn: true,
    });

    render(
      <MemoryRouter>
        <Sidebar activePage="home" />
      </MemoryRouter>
    );

    const logoutButton = screen.getByLabelText("Logout");
    expect(logoutButton).toBeDefined();

    fireEvent.click(logoutButton);

    expect(mockNavigate).toHaveBeenCalledWith('/');
  });

  test("render menu items when user is logged in", () => {
    useAuth.mockReturnValue({
      currentUser: { name: "Test User" },
      userLoggedIn: true,
    });

    render(
      <MemoryRouter>
        <Sidebar activePage="home" />
      </MemoryRouter>
    );

    expect(screen.getByLabelText("Home")).toBeInTheDocument();
    expect(screen.getByLabelText("Search")).toBeInTheDocument();
    expect(screen.getByLabelText("Lounges")).toBeInTheDocument();
    expect(screen.getByLabelText("Friends")).toBeInTheDocument();
    expect(screen.getByLabelText("History")).toBeInTheDocument();
  });
});
