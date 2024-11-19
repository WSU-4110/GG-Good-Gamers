import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Post from "../components/Post";

describe("Post Component", () => {
  // Test to check if the component renders correctly
  test("renders post correctly", () => {
    render(<Post name="John Doe" text="Hello World!" />);
    const authorElements = screen.getAllByText("John Doe");
    expect(authorElements.length).toBeGreaterThan(0); // 
    expect(authorElements[0]).toBeInTheDocument(); 
    expect(screen.getByText("Hello World!")).toBeInTheDocument();
  });

  // Test to check if the like button toggles correctly
  test("like button toggles correctly", () => {
    render(<Post />);
    const likeButton = screen.getByRole("button", { name: /like/i });
    fireEvent.click(likeButton); 
    expect(likeButton).toHaveStyle("color: #9b5de5"); 
    fireEvent.click(likeButton); 
    expect(likeButton).toHaveStyle("color: white"); 
  });

  // Test to check if the favorite button toggles correctly
  test("favorite button toggles correctly", () => {
    render(<Post />);
    const favoriteButton = screen.getByRole("button", { name: /favorite/i });
    fireEvent.click(favoriteButton); 
    expect(favoriteButton).toHaveStyle("color: #9b5de5"); 
    fireEvent.click(favoriteButton); 
    expect(favoriteButton).toHaveStyle("color: white"); 
  });

  // Test to check if the comment section toggles correctly
  test("toggle comment section", () => {
    render(<Post />);
    const commentButton = screen.getByRole("button", { name: /comment/i });
    fireEvent.click(commentButton); 
    expect(screen.getByPlaceholderText("Post a comment...")).toBeInTheDocument();
    fireEvent.click(commentButton); 
    expect(screen.queryByPlaceholderText("Post a comment...")).not.toBeInTheDocument();
  });

  // Test to check if comments are submitted and displayed correctly
  test("submit a comment", () => {
    render(<Post />);
    const commentButton = screen.getByRole("button", { name: /comment/i });
    fireEvent.click(commentButton); 

    const input = screen.getByPlaceholderText("Post a comment...");
    fireEvent.change(input, { target: { value: "Nice post!" } }); 
    fireEvent.keyDown(input, { key: "Enter", code: "Enter" }); 
    expect(screen.getByText("Nice post!")).toBeInTheDocument(); 
  });

  // Test to check if the image renders correctly
  test("renders image if provided", () => {
    render(<Post image="https://via.placeholder.com/150" />);
    const img = screen.getByAltText("Uploaded");
    expect(img).toHaveAttribute("src", "https://via.placeholder.com/150"); 
  });

  // Test to check if default profile picture is used when no profile picture is provided
  test("renders default profile picture if none provided", () => {
    render(<Post />);
    const profileImg = screen.getByAltText("Profile");
    expect(profileImg).toHaveAttribute("src", "https://via.placeholder.com/40");
  });
});
