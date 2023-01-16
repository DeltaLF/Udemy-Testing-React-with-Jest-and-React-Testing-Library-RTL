import {
  render,
  screen,
  waitFor,
} from "../../../test-utils/testing-library-utils";

import OrderEntry from "../OrderEntry";
import { rest } from "msw";
import { server } from "../../../../mock/server";

test.only("handles error for scoops and toppings routes", async () => {
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

test.skip("void test", () => {});
