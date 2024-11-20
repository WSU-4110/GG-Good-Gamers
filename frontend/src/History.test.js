import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "../contexts/authContext";
import History from "../pages/History";

describe("History Component", () => {
  const renderWithProviders = (component) => {
    return render(
      <AuthProvider>
        <BrowserRouter>{component}</BrowserRouter>
      </AuthProvider>
    );
  };

  // Test if the component renders the title correctly
  test("renders watch history title", () => {
    renderWithProviders(<History />);
    expect(screen.getByText("Watch History")).toBeInTheDocument();
  });

  // Test if the search bar is displayed
  test("displays search bar", () => {
    renderWithProviders(<History />);
    const searchInput = screen.getByPlaceholderText("Search watch history");
    expect(searchInput).toBeInTheDocument();
  });

  // Test if posts are displayed correctly
  test("renders posts correctly", () => {
    renderWithProviders(<History />);
    expect(screen.getByText("Sample Video 1")).toBeInTheDocument();
    expect(screen.getByText("Sample Video 2")).toBeInTheDocument();
  });

  // Test if posts are removed when 'onRemove' is triggered
  test("removes a post when 'Remove' is clicked", () => {
    renderWithProviders(<History />);
    const removeButton = screen.getByText("Remove", { selector: "button" });
    fireEvent.click(removeButton);
    expect(screen.queryByText("Sample Video 1")).not.toBeInTheDocument();
  });

  // Test if the left sidebar highlights the active page
  test("highlights 'history' in left sidebar", () => {
    renderWithProviders(<History />);
    const activeSidebarLink = screen.getByText("history", { selector: "a" });
    expect(activeSidebarLink).toHaveClass("active"); // Assuming active class is applied
  });

  // Test if the right sidebar renders user info
  test("renders right sidebar with user info", () => {
    renderWithProviders(<History />);
    expect(screen.getByText("User Info", { exact: false })).toBeInTheDocument(); // Assuming the sidebar displays user info
  });
});
