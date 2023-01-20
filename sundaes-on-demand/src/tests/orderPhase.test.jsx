// no need wrap because whole app is imported
import { findByRole, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "../App";

test("order phases for happ path", async () => {
  // render the app
  const { unmount } = render(<App />);
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
  const summaryHeader = screen.getByRole("heading", { name: /Order summary/i });
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
  const headerSync = screen.getByRole("heading", { name: /loading/i });
  const headerAsync = await screen.findByRole("heading", { name: /999/i });
  // check politeness exsists

  const politeness = await screen.findByText("Thank you");
  const loadingAsync = screen.queryByRole("heading", { name: /loading/i });
  expect(loadingAsync).not.toBeInTheDocument();

  // click "new order" button  on confirmation page
  const newOrder = await screen.findByRole("button", {
    name: /create new order/i,
  });
  await user.click(newOrder);

  // check that scoops and toppings subtotals have been reset
  const upadtedGrandTotal = await screen.findByText("Grand total: $0.00");

  // do we need to awiat anything to avoid test errors?
  unmount();
});

test("do not show scoops or toppings if they are not selected ", async () => {
  const { unmount } = render(<App />);
  const user = userEvent.setup();
  // select scoops

  const chocolate = await screen.findByRole("spinbutton", {
    name: /Chocolate/i,
  });
  await user.type(chocolate, "2");

  // clcik check button without selecting toppings
  const checkOrderButton = await screen.findByRole("button", {
    name: /Check order/i,
  });
  await user.click(checkOrderButton);

  // check the header of toppings should not appear
  const scoopsSummary = screen.queryByRole("heading", {
    name: /Scoops: \$/i,
  });
  expect(scoopsSummary).toBeInTheDocument();

  const toppingsSummary = screen.queryByRole("heading", {
    name: /toppings: \$/i,
  });
  expect(toppingsSummary).not.toBeInTheDocument();
  unmount();
});

test("do not show scoops if it's slected then unselect ", async () => {
  const { unmount } = render(<App />);
  const user = userEvent.setup();
  // select scoops

  const chocolate = await screen.findByRole("spinbutton", {
    name: /Chocolate/i,
  });

  await user.type(chocolate, "2");
  await user.clear(chocolate);
  await user.type(chocolate, "0");

  // clcik check button without selecting toppings
  const checkOrderButton = await screen.findByRole("button", {
    name: /Check order/i,
  });
  await user.click(checkOrderButton);

  // check the header of toppings should not appear
  const scoopsSummary = screen.queryByRole("heading", {
    name: /Scoops: \$/i,
  });
  expect(scoopsSummary).not.toBeInTheDocument();

  const toppingsSummary = screen.queryByRole("heading", {
    name: /toppings: \$/i,
  });
  expect(toppingsSummary).not.toBeInTheDocument();
  unmount();
});
