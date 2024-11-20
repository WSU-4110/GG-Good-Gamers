import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Sidebar from "../components/Sidebar";
describe("left sidebar Component", () => {
  // Test to check if the logo  renders correctly
  render(
    <Router>
      <Sidebar />
    </Router>
  );
  test("GG logo", () => {
    expect(screen.getByText("GG")).toBeInTheDocument();
  });

  describe("Sidebar Component", () => {
    test("navigates to /home on click of the Home menu", () => {
      // Render the component inside a Router for navigation support
      render(
        <Router>
          <Sidebar />
        </Router>
      );
      // Get the Home menu element
      const homeMenu = screen.getByRole("button", { name: /home/i }); // Use accessible role or text
      // Click on the menu
      fireEvent.click(homeMenu);
      // Check if the URL has changed
      expect(window.location.pathname).toBe("/home");
    });
  });

  test("Lounge button sets active menu to lounge", () => {
    render(
      <Router>
        <Sidebar />
      </Router>
    );

    const loungeButton = screen.getByRole("button", { hidden: true }); // Adjust the selector if necessary
    fireEvent.click(loungeButton);
    expect(loungeButton).toHaveStyle("color: purple"); // Ensure the button style changes
  });

  test("History button navigates to /history", () => {
    const mockNavigate = jest.fn();
    jest.mock("react-router-dom", () => ({
      ...jest.requireActual("react-router-dom"),
      useNavigate: () => mockNavigate,
    }));

    render(
      <Router>
        <Sidebar />
      </Router>
    );

    const historyButton = screen.getByRole("button", { hidden: true }); // Adjust the selector if necessary
    fireEvent.click(historyButton);
    expect(mockNavigate).toHaveBeenCalledWith("/history");
  });

  test("Logout button displays LOGIN text", () => {
    render(
      <Router>
        <Sidebar />
      </Router>
    );

    const logoutButton = screen.getByRole("button", { hidden: true }); // Adjust the selector if necessary
    fireEvent.click(logoutButton);
    expect(screen.getByText("LOGIN")).toBeInTheDocument();
  });
});
