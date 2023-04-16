import { render, screen } from "@testing-library/react";
import Login from "./LogIn";

test("renders input form", () => {
  render(<Login />);
  const linkElement = screen.getByText(/input form/i);
  expect(linkElement).toBeInTheDocument();
});

test("renders label", () => {
  render(<Login />);
  const linkElement = screen.getByText(/label/i);
  expect(linkElement).toBeInTheDocument();
});

test("renders input form", () => {
  render(<Login />);
  const linkElement = screen.getByText(/button/i);
  expect(linkElement).toBeInTheDocument();
});


