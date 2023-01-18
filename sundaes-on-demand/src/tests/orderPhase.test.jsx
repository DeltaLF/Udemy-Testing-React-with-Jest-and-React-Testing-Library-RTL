// no need wrap because whole app is imported
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "../App";

test("order phases for happ path", async () => {
  // render the app
  render(<App />);
  // initalize user
  const user = userEvent.setup();
  // add ice cream scoops and toppings
  const chocolate = await screen.findByRole("spinbutton", {
    name: /Chocolate/i,
  });
  await user.type(chocolate, "2");
  const cherries = await screen.findByRole("checkbox", { name: /Cherries/i });
  await user.click(cherries);
  // find and click order button
  const checkOrder = await screen.findByRole("button", {
    name: /check order/i,
  });
  await user.click(checkOrder);

  // check summary information based on order
  const scoopsTotal = await screen.findByText("Scoops: $4.00");
  const toppingsTotal = await screen.findByText("Toppings: $1.50");

  // accept terms and conditions and  click button on confirm oder
  const termCheck = await screen.findByRole("checkbox", {
    name: /terms and conditions/i,
  });
  await user.click(termCheck);
  // confirm order nunmber on confirmation page
  const confirmOrder = await screen.findByRole("button", {
    name: /confirm order/i,
  });
  await user.click(confirmOrder);

  // check politeness exsists
  const politeness = await screen.findByText("Thank you");

  // click "new order" button  on confirmation page
  const newOrder = await screen.findByRole("button", {
    name: /create new order/i,
  });
  await user.click(newOrder);

  // check that scoops and toppings subtotals have been reset
  const upadtedGrandTotal = await screen.findByText("Grand total: $0.00");

  // do we need to awiat anything to avoid test errors?
});
