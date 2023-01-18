import {
  getByText,
  render,
  screen,
} from "../../../test-utils/testing-library-utils";
import userEvent from "@testing-library/user-event";
import Options from "../Option";
import { OrderDetailsProvider } from "../../../context/OrderDetails";
import OrderEntry from "../OrderEntry";

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

describe("grand total", () => {
  const user = userEvent.setup();

  test("grand total starts at $0.00", () => {
    const { unmount } = render(<OrderEntry />);
    const grandTotal = screen.getByText("Grand total: $", { exact: false });
    expect(grandTotal).toHaveTextContent("$0.00");
    unmount();
  });
  test("grand total updates properly if scoops os added first", async () => {
    render(<OrderEntry />);
    const grandTotal = screen.getByText("Grand total: $", { exact: false });
    const chocolate = await screen.findByRole("spinbutton", {
      name: "Chocolate",
    });
    await user.type(chocolate, "2");
    expect(grandTotal).toHaveTextContent("$4.00");
    const cherries = await screen.findByRole("checkbox", { name: /Cherries/i });
    await user.click(cherries);
    expect(grandTotal).toHaveTextContent("$5.50");
  });
  test("grand total updates properly if toppings os added first", async () => {
    render(<OrderEntry />);
    const grandTotal = screen.getByText("Grand total: $", { exact: false });
    const cherries = await screen.findByRole("checkbox", { name: /Cherries/i });
    await user.click(cherries);
    expect(grandTotal).toHaveTextContent("$1.50");
    const chocolate = await screen.findByRole("spinbutton", {
      name: "Chocolate",
    });
    await user.type(chocolate, "2");
    expect(grandTotal).toHaveTextContent("$5.50");
  });
  test("grand total updates properly if item is removed", async () => {
    jest.setTimeout(10000);
    render(<OrderEntry />);
    const grandTotal = screen.getByText("Grand total: $", { exact: false });
    const cherries = await screen.findByRole("checkbox", { name: /Cherries/i });
    await user.click(cherries);
    expect(grandTotal).toHaveTextContent("$1.50");
    await user.click(cherries);
    expect(grandTotal).toHaveTextContent("$0.00");

    const chocolate = await screen.findByRole("spinbutton", {
      name: "Chocolate",
    });
    await user.type(chocolate, "2");
    expect(grandTotal).toHaveTextContent("$4.00");
    await user.clear(chocolate);
    await user.type(chocolate, "0");
    expect(grandTotal).toHaveTextContent("$0.00");
  });
});
