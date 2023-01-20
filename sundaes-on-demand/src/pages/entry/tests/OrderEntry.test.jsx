import {
  render,
  screen,
  waitFor,
} from "../../../test-utils/testing-library-utils";

import OrderEntry from "../OrderEntry";
import { rest } from "msw";
import { server } from "../../../../mock/server";
import userEvent from "@testing-library/user-event";

test("handles error for scoops and toppings routes", async () => {
  server.resetHandlers(
    rest.get("http://localhost:3030/scoops", (req, res, ctx) => {
      return res(ctx.status(500));
    }),
    rest.get("http://localhost:3030/toppings", (req, res, ctx) => {
      return res(ctx.status(500));
    })
  );
  render(<OrderEntry />);

  const alerts = await screen.findAllByText(
    /An unexpected error occured. Please try again later./i
  );
  //   const alerts = await screen.findAllByRole("alert", {
  //     name: /An unexpected error occured. Please try again later./i,
  //   });
  expect(alerts).toHaveLength(2);
  //   await waitFor(async () => {
  //     const alerts = await screen.findAllByRole("alert", {
  //         name: /An unexpected error occured. Please try again later./i,
  //       });
  //       expect(alerts).toHaveLength(2);
  //   });
});

test("disable order button if no scoops is selected", async () => {
  render(<OrderEntry setPhase={jest.fn} />);
  const user = userEvent.setup();
  // button is disable
  const orderButton = screen.getByRole("button", { name: /Check order/i });
  expect(orderButton).toBeDisabled();

  // click scoops to make button enable
  const chocolate = await screen.findByRole("spinbutton", {
    name: /chocolate/i,
  });
  await user.type(chocolate, "2");
  expect(orderButton).toBeEnabled();
  await user.clear(chocolate);
  await user.type(chocolate, "0");
  expect(orderButton).toBeDisabled();
});

test.skip("void test", () => {});
