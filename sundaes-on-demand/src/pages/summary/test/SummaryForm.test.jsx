import SummaryForm from "../SummaryForm";
import { render, fireEvent, screen } from "@testing-library/react";

test("checkbox default and clicked inital state", () => {
  render(<SummaryForm />);
  const checkbox = screen.getByRole("checkbox", {
    name: /Terms and Conditions/i,
  });
  const button = screen.getByRole("button", { name: /confirm order/i });
  expect(checkbox).not.toBeChecked();
  expect(button).toBeDisabled();
});

test("click checkbox to enable button and disable after clicking again", () => {
  render(<SummaryForm />);
  const checkbox = screen.getByRole("checkbox", {
    name: /Terms and Conditions/i,
  });
  const button = screen.getByRole("button", { name: /confirm order/i });
  fireEvent.click(checkbox);
  expect(checkbox).toBeChecked();
  expect(button).toBeEnabled();
  fireEvent.click(checkbox);
  expect(checkbox).not.toBeChecked();
  expect(button).toBeDisabled();
});
