import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import Sidebar from "../components/Sidebar";

// Mocking useAuth from authContext
jest.mock("../contexts/authContext/index.js", () => ({
  useAuth: jest.fn(() => ({
    currentUser: { email: "test@example.com" },
    userLoggedIn: true,
  })),
}));

// Mocking doSignOut
jest.mock("../firebase/auth.js", () => {
  return {
    doSignOut: jest.fn(), // Mocked function defined inline
  };
});

// Mocking FontAwesome
jest.mock("@fortawesome/react-fontawesome", () => ({
  FontAwesomeIcon: () => <span />,
}));

// Mocking react-router-dom's useNavigate
const mockNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockNavigate,
}));

describe("Sidebar Component", () => {
  test("GG logo renders correctly", () => {
    render(
      <Router>
        <Sidebar />
      </Router>
    );
    expect(screen.getByText("GG")).toBeInTheDocument();
  });

  test("navigates to /home on Home button click", () => {
    render(
      <Router>
        <Sidebar />
      </Router>
    );

    const homeButton = screen.getByRole("button", { name: /home/i });
    fireEvent.click(homeButton);
    expect(mockNavigate).toHaveBeenCalledWith("/home");
  });

  test("Lounge button sets active menu to lounge", () => {
    render(
      <Router>
        <Sidebar activePage="lounge" />
      </Router>
    );

    const loungeButton = screen.getByRole("button", { hidden: true }); // Adjust selector
    fireEvent.click(loungeButton);
    expect(loungeButton).toHaveStyle("color: purple");
  });

  test("History button navigates to /history", () => {
    render(
      <Router>
        <Sidebar />
      </Router>
    );

    const historyButton = screen.getByRole("button", { hidden: true }); // Adjust selector
    fireEvent.click(historyButton);
    expect(mockNavigate).toHaveBeenCalledWith("/history");
  });

  test("Logout button displays LOGIN text", () => {
    render(
      <Router>
        <Sidebar />
      </Router>
    );

    const logoutButton = screen.getByRole("button", { hidden: true }); // Adjust selector
    fireEvent.click(logoutButton);
    expect(screen.getByText("LOGIN")).toBeInTheDocument();
  });
});
