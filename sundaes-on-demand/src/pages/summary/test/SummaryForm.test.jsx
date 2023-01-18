import SummaryForm from "../SummaryForm";
import { render, screen } from "../../../test-utils/testing-library-utils";
import userEvent from "@testing-library/user-event";

test("checkbox default and clicked inital state", () => {
  render(<SummaryForm />);
  const checkbox = screen.getByRole("checkbox", {
    name: /Terms and Conditions/i,
  });
  const button = screen.getByRole("button", { name: /confirm order/i });
  expect(checkbox).not.toBeChecked();
  expect(button).toBeDisabled();
});

test("click checkbox to enable button and disable after clicking again", async () => {
  render(<SummaryForm />);
  const checkbox = screen.getByRole("checkbox", {
    name: /Terms and Conditions/i,
  });
  const user = userEvent.setup();
  const button = screen.getByRole("button", { name: /confirm order/i });
  await user.click(checkbox);
  expect(checkbox).toBeChecked();
  expect(button).toBeEnabled();
  await user.click(checkbox);
  expect(checkbox).not.toBeChecked();
  expect(button).toBeDisabled();
});

// class="modal-dialog"
test("hovers on checkbox terms and conditions appear a modal dialog", async () => {
  render(<SummaryForm />);
  const user = userEvent.setup();
  const nunllPopover = screen.queryByText(
    /no ice cream will actually be delivered/i
  );
  expect(nunllPopover).not.toBeInTheDocument();

  // popover appears after hovering
  const termsAndCondtions = screen.getByText(/terms and conditions/i);
  await user.hover(termsAndCondtions);
  const popover = screen.getByText(/no ice cream will actually be delivered/i);
  expect(popover).toBeInTheDocument();
  // disapper after unhovering
  await user.unhover(termsAndCondtions);
  expect(nunllPopover).not.toBeInTheDocument();
});
