import { render, screen } from "../../../test-utils/testing-library-utils";
import userEvent from "@testing-library/user-event";
import Options from "../Option";
import { OrderDetailsProvider } from "../../../context/OrderDetails";

test("update scoop subtotal when scoops change", async () => {
  const user = userEvent.setup();
  render(<Options optionType="scoops" />);

  // make sure totla starts out at $0
  const scoopSubtotal = screen.getByText("Scoops total: $", {
    exact: false,
  });
  expect(scoopSubtotal).toHaveTextContent("0.00");
  // update vanilla scoops to 1, and check subtotal
  const vanillaInput = await screen.findByRole("spinbutton", {
    name: "Vanilla",
  });
  await user.clear(vanillaInput);
  await user.type(vanillaInput, "1");
  expect(scoopSubtotal).toHaveTextContent("2.00");
  // update chocolate scoops to 2 and check subtotal
  const chocolateInput = await screen.findByRole("spinbutton", {
    name: "Chocolate",
  });
  await user.clear(chocolateInput);
  await user.type(chocolateInput, "2");
  expect(scoopSubtotal).toHaveTextContent("6.00");
});

// toppings test
test("update toppings total while toppings is clicked or unclicked", async () => {
  const user = userEvent.setup();
  render(<Options optionType={"toppings"} />);
  const toppingSubTotal = screen.getByText("Toppings total: $", {
    exact: false,
  });
  // make sure initial value is 0
  expect(toppingSubTotal).toHaveTextContent("$0.00");

  // find the check box of different toppings
  const hotFudge = await screen.findByRole("checkbox", {
    name: /Hot fudge/i,
  });
  expect(hotFudge).not.toBeChecked();
  const cherries = await screen.findByRole("checkbox", {
    name: /Cherries/i,
  });
  expect(cherries).not.toBeChecked();
  await user.click(hotFudge);
  expect(hotFudge).toBeChecked();
  expect(toppingSubTotal).toHaveTextContent("$1.50");
  await user.click(cherries);
  expect(cherries).toBeChecked();
  expect(toppingSubTotal).toHaveTextContent("$3.00");
  // unclick
  await user.click(hotFudge);
  expect(hotFudge).not.toBeChecked();
  expect(toppingSubTotal).toHaveTextContent("$1.50");
});
